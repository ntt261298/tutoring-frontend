import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { Modal } from '@tutoring/commons/components';
import { updateUser } from 'actions/user';
import { showSuccessMsg } from 'utils/toastr';

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

const UpdateUser = ({
  onModalClose,
  user,
  onUpdateSuccess,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [freeBalance, setFreeBalance] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUpdateUser = async () => {
    setSubmitting(true);
    const { error } = await dispatch(updateUser(user.id, {
      freeBalance,
    }));

    if (error) {
      let errorMsg = 'Update user failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
      setSubmitting(false);
    } else {
      showSuccessMsg('Update user successfully!');
      onUpdateSuccess();
      onModalClose();
    }
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText={`Update user ${user.email}`}
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
            label="Add Free Balance"
            fullWidth
            value={freeBalance}
            onChange={e => setFreeBalance(e.target.value)}
          />
        </>
      )}
      footerType="double"
      primaryButtonText="Update"
      disablePrimaryButton={submitting}
      onClickPrimaryButton={handleUpdateUser}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default UpdateUser;
