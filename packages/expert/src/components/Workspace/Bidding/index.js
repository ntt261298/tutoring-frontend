import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import expertWorkingLogo from 'assets/images/expert-working.png';

const useStyles = makeStyles(theme => ({
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
  const [earnings, setEarnings] = useState(10);

  const handleChangeEarnings = (e, newEarnings) => {
    setEarnings(newEarnings);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
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
              Choose your earnings (USD):
            </Box>
            <Slider
              value={earnings}
              onChange={handleChangeEarnings}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              step={2}
              min={0}
              max={16}
            />
            <Button className={classes.claimButton}>
              Claim
            </Button>
            <Divider />
            <Button className={classes.skipButton}>
              Skip
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box component="h3" className={classes.centerStyle}>
            Preview
          </Box>
          <Box component="h3" className={classes.centerStyle}>
            <img src={expertWorkingLogo} alt="expert working" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Bidding;
