import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import expertWorkingLogo from 'assets/images/expert-working.png';

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

  return (
    <Paper className={classes.paper}>
      <Box component="h3">
        Question content
      </Box>
      <Box component="p">
        This is a test question. Please skip this. Thanks.
      </Box>
      <Divider />
      <Box component="h3">
        Topic: Math
      </Box>
      <Divider />
      <Box component="h3">
        File:
      </Box>
      <Box className={classes.centerStyle}>
        <img src={expertWorkingLogo} alt="expert working" className={classes.image} />
      </Box>
    </Paper>
  );
};

export default Summary;
