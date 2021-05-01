import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Summary from './Summary';
import Chat from './Chat';
import Editor from './Editor';

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: '30px',
    paddingRight: '30px',
    // height: '90vh',
  },
  paper: {
    marginTop: 20,
    padding: '10px 20px',
    height: '100%',
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

const Bidding = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Summary />
        </Grid>
        <Grid item xs={5}>
          <Chat />
        </Grid>
        <Grid item xs={4}>
          <Editor
            editorStyle={{
              flexShrink: 1,
              marginLeft: 20,
              marginTop: 20,
              padding: 10,
              height: '100%',
            }}
            toolMenuStyle={{
              position: 'absolute',
              bottom: 15,
              zIndex: '3',
              width: '20%',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Bidding;
