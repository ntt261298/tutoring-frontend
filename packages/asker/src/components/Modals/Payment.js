import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { Modal, Braintree } from '@tutoring/commons/components';
import { getBrainTreeClientToken, purchasePackage, getInfo } from 'actions/user';
import { getUserSubscription } from 'actions/userSubscription';
import { showSuccessMsg } from 'utils/toastr';

const useStyles = makeStyles(() => ({
  selectedPackage: {
    textAlign: 'center',
    border: '1px solid back',
  },
}));

const Payment = ({
  onModalClose,
  selectedPackage,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const braintreeRef = useRef();
  const [isBraintreeReady, setIsBraintreeReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onBraintreeReady = () => {
    setIsBraintreeReady(true);
  };

  const onPaymentMethodReceived = async (paymentObj) => {
    if (!paymentObj) {
      setSubmitting(false);
      return;
    }

    const data = {
      paymentMethodNonce: paymentObj.nonce,
      packageId: selectedPackage.id,
    };

    setSubmitting(true);
    const { error } = await dispatch(purchasePackage(data));

    if (error) {
      let errorMsg = 'Purchase failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSubmitting(false);
    } else {
      showSuccessMsg('Purchase successfully! Now you can continue posting questions.');
      setErrorMessage(null);
      await dispatch(getInfo());
      await dispatch(getUserSubscription());
      onModalClose();
      history.push('/home');
    }
  };

  const getPaymentMethod = () => {
    braintreeRef.current.getPaymentMethod();
  };

  const onError = () => {};

  return (
    <Modal
      onHide={onModalClose}
      headerText="Payment method"
      body={(
        <>
          {errorMessage && (
            <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          <Braintree
            ref={braintreeRef}
            onReady={onBraintreeReady}
            onError={onError}
            getBrainTreeClientToken={() => dispatch(getBrainTreeClientToken())}
            onPaymentMethodReceived={onPaymentMethodReceived}
            transactionAmount={selectedPackage.transactionAmount || 0}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>Selected package</Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Package name</TableCell>
                      <TableCell align="center">Number of Questions</TableCell>
                      <TableCell align="center">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={selectedPackage.name}>
                      <TableCell component="th" scope="row">
                        {selectedPackage.name}
                      </TableCell>
                      <TableCell
                        align="center"
                      >
                        {selectedPackage.numberOfQuestions || 'Unlimited'}
                      </TableCell>
                      <TableCell align="center">{`$${selectedPackage.transactionAmount}`}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      )}
      footerType="double"
      primaryButtonText={submitting ? 'Submitting' : 'Submit'}
      disablePrimaryButton={!isBraintreeReady || submitting}
      onClickPrimaryButton={getPaymentMethod}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default Payment;
