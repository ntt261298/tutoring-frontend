import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import { TopicId, SubscriptionStatus, ErrorCode } from 'constants/common';
import { validateFile } from 'utils/validation';
import { ModalKey } from 'constants/modal';
import { newQuestion } from 'actions/question';
import { showModal } from 'actions/modal';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
  },
  content: {
    margin: '10px',
  },
  textArea: {
    margin: '10px 0',
    width: '100%',
    resize: 'none',
    padding: '10px',
  },
  formControl: {
    minWidth: 120,
  },
  submitButton: {
    width: '100%',
    margin: '0 20px 20px',
  },
  alignItemsAndJustifyContent: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    border: 'none',
    color: 'red',
    fontSize: '1rem',
    background: 'transparent',
    width: 24,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  previewImage: {
    width: 200,
    marginLeft: 20,
  },
}));

const AskForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Select from redux
  const question = useSelector(({ user }) => user.workingState?.question);
  const freeCreditBalance = useSelector(({ user }) => user.freeCreditBalance || 0);
  const paidCreditBalance = useSelector(({ user }) => user.paidCreditBalance || 0);
  const isSubscriber = useSelector(({ userSubscription }) => userSubscription.status === SubscriptionStatus.ACTIVE);

  // Local state
  const [selectedTopic, setSelectedTopic] = useState(TopicId.MATH);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let file;
    if (e.target && e.target.files) {
      // eslint-disable-next-line prefer-destructuring
      file = e.target.files[0];
    }

    const error = validateFile(file);
    if (error) {
      setFileError(error);
      return;
    }

    setFileError(null);
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostQuestion = async () => {
    if (!isSubscriber && !freeCreditBalance && !paidCreditBalance) {
      dispatch(showModal(ModalKey.INSUFFICIENT_BALANCE));
      return;
    }
    setSubmitting(true);
    const data = {
      topicId: selectedTopic, content, file: selectedFile,
    };
    const { error } = await dispatch(newQuestion(data));

    if (error && error.data?.errorCode === ErrorCode.ACTIVE_QUESTION) {
      dispatch(showModal(ModalKey.ACTIVE_QUESTION, { questionId: question?.id }));
    }
    if (!error) {
      dispatch(showModal(ModalKey.MATCHING_EXPERT));
    }
    setSubmitting(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          Post a question
        </Typography>
        <TextareaAutosize
          className={classes.textArea}
          aria-label="minimum height"
          rowsMin={10}
          placeholder="(Required) Enter your question here..."
          onChange={handleContentChange}
        />
        {fileError && (
          <Alert severity="error" className={classes.alert}>{fileError}</Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.alignItemsAndJustifyContent}>
            {!selectedFile && (
              <Button
                variant="outlined"
                component="label"
              >
                Upload file (optional)
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            )}
            {selectedFile && (
              <>
                <div>
                  <button type="button" className={classes.closeButton} onClick={handleRemoveFile}>×</button>
                  <span>{selectedFile.name}</span>
                </div>
                <div>
                  <img src={URL.createObjectURL(selectedFile)} alt="preview" className={classes.previewImage} />
                </div>
              </>
            )}
          </Grid>
          <Grid item xs={6} className={classes.alignItemsAndJustifyContent}>
            <FormControl className={classes.formControl}>
              <Select
                value={selectedTopic}
                onChange={handleTopicChange}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>Topic</MenuItem>
                <MenuItem value={TopicId.ENGLISH}>English</MenuItem>
                <MenuItem value={TopicId.MATH}>Math</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          disabled={!content || submitting}
          onClick={handlePostQuestion}
        >
          Connect to an Expert
        </Button>
      </CardActions>
    </Card>
  );
};

export default AskForm;
