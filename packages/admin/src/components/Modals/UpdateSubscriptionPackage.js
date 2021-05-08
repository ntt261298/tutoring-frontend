import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { Modal } from '@tutoring/commons/components';
import { updateSubscriptionPackage } from 'actions/subscriptionPackage';
import { showSuccessMsg } from 'utils/toastr';
import { PackageType } from 'constants/common';

const useStyles = makeStyles(() => ({
  topicInput: {
    margin: '15px 0',
  },
  alert: {
    width: '100%',
    margin: 5,
  },
  alignVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textField: {
    marginBottom: 2,
  },
}));

const UpdateSubscriptionPackage = ({
  onModalClose,
  item,
  onUpdateSuccess,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [packageName, setPackageName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [numberOfQuestions, setNumberOfQuestions] = useState(item.numberOfQuestions);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUpdateSubscription = async () => {
    setSubmitting(true);
    const { error } = await dispatch(updateSubscriptionPackage(item.id, {
      name: packageName,
      price,
      numberOfQuestions,
    }));

    if (error) {
      let errorMsg = 'Update subscription package failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
      setSubmitting(false);
    } else {
      showSuccessMsg('Update subscription package successfully!');
      onUpdateSuccess();
      onModalClose();
    }
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="Update subscription package"
      body={(
        <>
          {errorMessage && (
            <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert severity="success" className={classes.alert}>{successMessage}</Alert>
          )}
          <TextField
            className={classes.textField}
            label="Name"
            fullWidth
            value={packageName}
            onChange={e => setPackageName(e.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Price (USD)"
            fullWidth
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Number Of Questions"
            fullWidth
            value={numberOfQuestions}
            disabled={item.type !== PackageType.BUNDLE}
            onChange={e => setNumberOfQuestions(e.target.value)}
          />
        </>
      )}
      footerType="double"
      primaryButtonText="Update"
      disablePrimaryButton={submitting}
      onClickPrimaryButton={handleUpdateSubscription}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default UpdateSubscriptionPackage;
