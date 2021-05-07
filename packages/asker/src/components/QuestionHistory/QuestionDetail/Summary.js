import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
    padding: '10px 20px',
    height: 'calc(100vh - 100px)',
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

const Summary = ({
  question = {},
}) => {
  const classes = useStyles();

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
        Topic:
        {' '}
        {question?.topic?.name}
      </Box>
      <Divider />
      <Box component="h3">
        {`File: ${!question?.file ? 'No file' : ''}`}
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
