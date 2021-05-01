import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Topic } from 'constants/question';
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
  const [currentTopic, setCurrentTopic] = useState(Topic.MATH);

  return (
    <Box className={classes.container}>
      {currentTopic === Topic.MATH && <Math />}
    </Box>
  );
};

export default Working;
