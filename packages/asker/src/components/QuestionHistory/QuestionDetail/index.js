import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Summary from './Summary';
import Messages from './Messages';

const useStyles = makeStyles({
  container: {
    padding: '0 30px',
  },
  backArrow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const QuestionDetail = ({
  question,
  onBack,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box component="h2">
        <ArrowBackIcon onClick={onBack} className={classes.backArrow} />
        {' '}
        Back to question list
      </Box>
      <Grid container>
        <Grid item xs={4}>
          <Summary question={question} />
        </Grid>
        <Grid item xs={8}>
          <Messages messages={question?.messages} />
        </Grid>
      </Grid>
    </Box>

  );
};

export default QuestionDetail;
