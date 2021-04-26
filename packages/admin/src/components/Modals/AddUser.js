import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Modal } from '@tutoring/commons/components';
import { createUser } from 'actions/user';
import { showModal } from 'actions/modal';
import { ModalKey } from 'constants/modal';
import { AccountType } from 'constants/common';

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

const AddUser = ({
  onModalClose,
  onAddSuccess,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCreateUser = async () => {
    if (!validator.isEmail(email)) {
      setErrorMessage('Invalid email.');
      return;
    }

    setSubmitting(true);
    const { error, result } = await dispatch(createUser({ email }));

    if (error) {
      let errorMsg = 'Create user failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
      setSubmitting(false);
    } else {
      dispatch(showModal(ModalKey.PASSWORD_INFO, {
        type: AccountType.USER,
        email: result.email,
        password: result.password,
      }));
      onAddSuccess();
    }
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="Add new user"
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
            label="Email (Required)"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </>
      )}
      footerType="double"
      primaryButtonText="Submit"
      disablePrimaryButton={!email || submitting}
      onClickPrimaryButton={handleCreateUser}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default AddUser;
