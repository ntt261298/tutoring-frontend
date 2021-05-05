import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Summary from './Summary';
import Chat from './Chat';

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  paper: {
    marginTop: 20,
    padding: '10px 20px',
  },
  claimButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  skipButton: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: '1px solid #1976d2',
  },
  centerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Math = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Summary />
        </Grid>
        <Grid item xs={8}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
};

export default Math;
