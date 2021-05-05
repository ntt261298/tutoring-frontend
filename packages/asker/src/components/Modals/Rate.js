import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Modal } from '@tutoring/commons/components';
import { rate } from 'actions/question';

const useStyles = makeStyles(() => ({
  textArea: {
    margin: '10px 0',
    width: '100%',
    resize: 'none',
    padding: '10px',
  },
}));

const Rate = ({
  onModalClose,
  questionId,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRate = async () => {
    setSubmitting(true);
    const { error } = await dispatch(rate({ questionId, score, comment }));

    if (error) {
      let errorMsg = 'Rate failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
    } else {
      history.push('/home');
      onModalClose();
    }
    setSubmitting(false);
  };

  return (
    <Modal
      headerText="Please rate your expert!"
      body={(
        <>
          {errorMessage && (
          <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert severity="success" className={classes.alert}>{successMessage}</Alert>
          )}
          <Rating
            name="simple-controlled"
            value={score}
            onChange={(event, newValue) => {
              setScore(newValue);
            }}
          />
          <TextareaAutosize
            className={classes.textArea}
            aria-label="minimum height"
            rowsMin={8}
            placeholder="Tell us more..."
            onChange={e => setComment(e.target.value)}
          />
        </>
      )}
      closable={false}
      footerType="single"
      disablePrimaryButton={!score || submitting}
      onClickPrimaryButton={handleRate}
      primaryButtonText="Submit"
    />
  );
};

export default Rate;
