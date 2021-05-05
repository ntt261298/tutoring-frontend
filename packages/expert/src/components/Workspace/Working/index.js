import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Topic, TopicId } from 'constants/question';
import Math from './Math';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
}));

const Working = () => {
  const classes = useStyles();
  const questionInfo = useSelector(state => state.question?.questionInfo);

  return (
    <Box className={classes.container}>
      {questionInfo?.topicId === TopicId.MATH && <Math />}
    </Box>
  );
};

export default Working;
