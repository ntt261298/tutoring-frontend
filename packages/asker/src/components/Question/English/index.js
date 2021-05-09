import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Summary from './Summary';
import VideoCall from './VideoCall';

const useStyles = makeStyles(() => ({
  container: {
    paddingLeft: '30px',
    paddingRight: '30px',
  },
}));

const English = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Summary />
        </Grid>
        <Grid item xs={8}>
          <VideoCall />
        </Grid>
      </Grid>
    </>
  );
};

export default English;
