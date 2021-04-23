import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { updateExpert } from 'actions/expert';
import { TopicId } from 'constants/common';
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

const checkTopicExisted = (expertTopics, topicId) => {
  const existed = expertTopics.find(expert => expert.topicId === topicId);
  if (existed) {
    return true;
  }
  return false;
};

const UpdateExpert = ({
  onModalClose,
  expert,
  onUpdateSuccess,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [topic, setTopic] = useState({
    math: checkTopicExisted(expert.expertTopics, TopicId.MATH),
    english: checkTopicExisted(expert.expertTopics, TopicId.ENGLISH),
  });
  const [mathRanking, setMathRanking] = useState(null);
  const [englishRanking, setEnglishRanking] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleTopicChange = (event) => {
    setTopic({ ...topic, [event.target.name]: event.target.checked });
  };

  const handleUpdateExpert = async () => {
    if ((topic.math && !mathRanking && !checkTopicExisted(expert.expertTopics, TopicId.MATH))
    || (topic.english && !englishRanking && !checkTopicExisted(expert.expertTopics, TopicId.ENGLISH))) {
      setErrorMessage('Should set ranking for the selected topic.');
      return;
    }

    if ((mathRanking < 0 || mathRanking > 5) || (englishRanking < 0 || englishRanking > 5)) {
      setErrorMessage('Ranking must be between 0 and 5');
      return;
    }

    setSubmitting(true);
    const { error } = await dispatch(updateExpert(expert.id, {
      topic, mathRanking, englishRanking,
    }));

    if (error) {
      let errorMsg = 'Update expert failed. Please try again.';
      if (error.data && error.data.errorMessage) {
        errorMsg = error.data.errorMessage;
      }
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
      setSubmitting(false);
    } else {
      showSuccessMsg('Update expert successfully!');
      onUpdateSuccess();
      onModalClose();
    }
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText={`Update expert ${expert.email}`}
      body={(
        <>
          {errorMessage && (
            <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert severity="success" className={classes.alert}>{successMessage}</Alert>
          )}
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
                {!checkTopicExisted(expert.expertTopics, TopicId.MATH) && (
                  <Grid item xs={6}>
                    <Input
                      type="number"
                      placeholder="Initial ranking"
                      value={mathRanking}
                      onChange={e => setMathRanking(e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={topic.english} onChange={handleTopicChange} name="english" />}
                    label="English"
                  />
                </Grid>
                {!checkTopicExisted(expert.expertTopics, TopicId.ENGLISH) && (
                  <Grid item xs={6}>
                    <Input
                      type="number"
                      placeholder="Initial ranking"
                      value={englishRanking}
                      onChange={e => setEnglishRanking(e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>
            </FormGroup>
          </FormControl>
        </>
      )}
      footerType="double"
      primaryButtonText="Update"
      disablePrimaryButton={submitting}
      onClickPrimaryButton={handleUpdateExpert}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default UpdateExpert;
