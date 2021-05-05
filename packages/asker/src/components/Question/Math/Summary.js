import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Topic } from 'constants/common';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
    padding: '10px 20px',
    height: '100%',
  },
  centerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '300px',
  },
}));

const Summary = () => {
  const classes = useStyles();
  const question = useSelector(state => state.question);

  return (
    <Paper className={classes.paper}>
      <Box component="h3">
        Question content
      </Box>
      <Box component="p">
        {question?.text}
      </Box>
      <Divider />
      <Box component="h3">
        Topic: {question?.topic?.name}
      </Box>
      <Divider />
      <Box component="h3">
        {`File: ${!question?.file && 'No file'}`}
      </Box>
      {question?.file && (
        <Box className={classes.centerStyle}>
          <img src={`data:image/jpeg;base64,${question?.file?.renderedData}`} alt="expert working" className={classes.image} />
        </Box>
      )}
    </Paper>
  );
};

export default Summary;
