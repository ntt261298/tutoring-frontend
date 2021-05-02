import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { QuestionState } from 'constants/question';
import { getState } from 'actions/question';
import { connect } from 'actions/user';
import HeaderWorking from 'components/Commons/HeaderWorking';
import Waiting from './Waiting';
import Bidding from './Bidding';
import Working from './Working';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const WorkSpace = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const questionInfo = useSelector(state => state.question?.questionInfo);
  const questionState = useSelector(state => state.question?.state);
  const [connecting, setConnecting] = useState(true);

  console.log('question', questionInfo);

  const initConnection = async () => {
    const { error } = await dispatch(connect());
    if (!error) {
      await dispatch(getState());
    }
    setConnecting(false);
  };

  useEffect(() => {
    initConnection();
  }, []);

  if (connecting) {
    return (
      <Box className={classes.center}>Connecting...</Box>
    );
  }

  return (
    <Box className={classes.container}>
      <CssBaseline />
      <HeaderWorking questionState={questionState} />
      {questionState === QuestionState.STATE_NOT_ROUTED && <Waiting />}
      {[QuestionState.STATE_BIDDING, QuestionState.STATE_KING].includes(questionState) && <Bidding />}
      {[QuestionState.STATE_WORKING, QuestionState.STATE_RATING].includes(questionState) && <Working />}
    </Box>
  );
};

export default WorkSpace;
