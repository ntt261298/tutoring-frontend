import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { Modal } from '@tutoring/commons/components';
import { createExpert } from 'actions/expert';
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

const AddExpert = ({
  onModalClose,
  onAddSuccess,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState({
    math: true,
    english: false,
  });
  const [mathRanking, setMathRanking] = useState(null);
  const [englishRanking, setEnglishRanking] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleTopicChange = (event) => {
    setTopic({ ...topic, [event.target.name]: event.target.checked });
  };

  const handleCreateExpert = async () => {
    if (!validator.isEmail(email)) {
      setErrorMessage('Invalid email.');
      return;
    }

    if ((topic.math && !mathRanking) || (topic.english && !englishRanking)) {
      setErrorMessage('Should set ranking for the selected topic.');
      return;
    }

    if ((mathRanking < 0 || mathRanking > 5) || (englishRanking < 0 || englishRanking > 5)) {
      setErrorMessage('Ranking must be between 0 and 5');
      return;
    }

    setSubmitting(true);
    const { error, result } = await dispatch(createExpert({
      email, topic, mathRanking, englishRanking,
    }));

    if (error) {
      let errorMsg = 'Create expert failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
      setSubmitting(false);
    } else {
      dispatch(showModal(ModalKey.PASSWORD_INFO, {
        type: AccountType.EXPERT,
        email: result.email,
        password: result.password,
      }));
      onAddSuccess();
    }
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="Add new expert"
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
          <FormControl component="fieldset" className={classes.topicInput}>
            <FormLabel component="legend">Topic:</FormLabel>
            <FormGroup>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={topic.math} onChange={handleTopicChange} name="math" />}
                    label="Math"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    type="number"
                    placeholder="Initial ranking"
                    value={mathRanking}
                    onChange={e => setMathRanking(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={topic.english} onChange={handleTopicChange} name="english" />}
                    label="English"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    type="number"
                    placeholder="Initial ranking"
                    value={englishRanking}
                    onChange={e => setEnglishRanking(e.target.value)}
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        </>
      )}
      footerType="double"
      primaryButtonText="Submit"
      disablePrimaryButton={!email || submitting}
      onClickPrimaryButton={handleCreateExpert}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default AddExpert;
