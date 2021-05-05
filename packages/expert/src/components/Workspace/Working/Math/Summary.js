import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Topic } from 'constants/question';

const useStyles = makeStyles(() => ({
  container: {
    paddingLeft: '30px',
    paddingRight: '30px',
    height: '100%',
  },
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
    width: '100%',
  },
}));

const Summary = () => {
  const classes = useStyles();
  const questionInfo = useSelector(state => state.question?.questionInfo);

  return (
    <Paper className={classes.paper}>
      <Box component="h3">
        Question content
      </Box>
      <Box component="p">
        {questionInfo?.text}
      </Box>
      <Divider />
      <Box component="h3">
        {`Topic: ${Topic[questionInfo?.topicId]}`}
      </Box>
      <Divider />
      <Box component="h3">
        {`File: ${!questionInfo?.file && 'No file'}`}
      </Box>
      {questionInfo?.file && (
        <Box className={classes.centerStyle}>
          <img src={`data:image/jpeg;base64,${questionInfo?.file?.renderedData}`} alt="expert working" className={classes.image} />
        </Box>
      )}
    </Paper>
  );
};

export default Summary;
