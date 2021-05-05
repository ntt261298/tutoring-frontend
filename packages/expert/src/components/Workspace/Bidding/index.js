import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Topic } from 'constants/question';
import { ModalKey } from 'constants/modal';
import { claim, skip } from 'actions/question';
import expertWorkingLogo from 'assets/images/expert-working.png';
import { showModal } from 'actions/modal';

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
  const dispatch = useDispatch();
  const questionInfo = useSelector(state => state.question?.questionInfo);
  const [earnings, setEarnings] = useState(8);

  const handleChangeEarnings = (e, newEarnings) => {
    setEarnings(newEarnings);
  };

  const handleSkip = () => {
    dispatch(skip({
      questionId: questionInfo?.id,
    }));
  };

  const handleClaim = async () => {
    const { result } = await dispatch(claim({
      questionId: questionInfo?.id,
      bidAmount: earnings,
    }));

    if (result) {
      dispatch(showModal(ModalKey.BIDDING_DIALOG));
    }
  };

  useEffect(() => () => dispatch(showModal(null)), []);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Box component="h3">
              Question content
            </Box>
            <Box component="p">
              {questionInfo?.text}
            </Box>
            <Divider />
            <Box component="h3">
              Topic:
              {' '}
              {Topic[questionInfo?.topicId] || 'Math'}
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
            <Button
              className={classes.claimButton}
              onClick={handleClaim}
            >
              Claim
            </Button>
            <Divider />
            <Button
              className={classes.skipButton}
              onClick={handleSkip}
            >
              Skip
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box component="h3" className={classes.centerStyle}>
            Preview
          </Box>
          {questionInfo?.file && (
            <Box component="h3" className={classes.centerStyle}>
              <img src={`data:image/jpeg;base64,${questionInfo?.file?.renderedData}`} alt="expert working" className={classes.image} />
            </Box>
          )}
          {!questionInfo?.file && (
            <Box component="h2" className={classes.centerStyle} style={{ height: '100%' }}>
              No File
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Bidding;
