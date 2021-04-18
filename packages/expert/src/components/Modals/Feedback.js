import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Modal } from '@tutoring/commons/components';
import { createFeedback } from 'actions/feedback';

const useStyles = makeStyles(() => ({
  textArea: {
    margin: '10px 0',
    width: '100%',
    resize: 'none',
    padding: '10px',
  },
}));

const Feedback = ({
  onModalClose,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCreateFeedback = async () => {
    setSubmitting(true);
    const { error } = await dispatch(createFeedback({ content }));

    if (error) {
      let errorMsg = 'Submit feedback failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
    } else {
      setSuccessMessage('Thanks for sending us your feedback!');
      setErrorMessage(null);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="Give us your feedback!"
      body={(
        <>
          {errorMessage && (
          <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert severity="success" className={classes.alert}>{successMessage}</Alert>
          )}
          <TextareaAutosize
            className={classes.textArea}
            aria-label="minimum height"
            rowsMin={8}
            placeholder="(Required) Enter your feedback here..."
            onChange={e => setContent(e.target.value)}
          />
        </>
      )}
      footerType="double"
      primaryButtonText="Submit"
      disablePrimaryButton={!content || submitting}
      onClickPrimaryButton={handleCreateFeedback}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default Feedback;
