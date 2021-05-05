import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { QuestionState } from 'constants/question';
import { ModalKey } from 'constants/modal';
import { getState, updateState } from 'actions/question';
import { connect, disconnect } from 'actions/user';
import { showModal } from 'actions/modal';
import pusher from 'utils/pusher';
import HeaderWorking from 'components/Workspace/Commons/HeaderWorking';
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

  const onExpertStateChange = (state) => {
    if (state.state === QuestionState.STATE_NOT_ROUTED && questionState === QuestionState.STATE_BIDDING && questionInfo) {
      // Bidding => Not Routed
      showModal(ModalKey.BID_FAIL);
    }
    dispatch(updateState(state));
  };

  const setupPusher = () => {
    pusher.bind('account', 'state_change', onExpertStateChange);
  };

  const disconnectPusher = () => {
    pusher.unbind('account', 'state_change');
  };

  const initConnection = async () => {
    const { error } = await dispatch(connect());
    if (!error) {
      await dispatch(getState());
      setupPusher();
    }
    setConnecting(false);
  };

  useEffect(() => {
    initConnection();

    return () => {
      disconnectPusher();
      dispatch(disconnect());
    };
  }, []);

  if (connecting) {
    return (
      <Box className={classes.center}>Connecting...</Box>
    );
  }

  return (
    <Box className={classes.container}>
      <CssBaseline />
      <HeaderWorking />
      {questionState === QuestionState.STATE_NOT_ROUTED && <Waiting />}
      {[QuestionState.STATE_BIDDING, QuestionState.STATE_KING].includes(questionState) && <Bidding />}
      {[QuestionState.STATE_WORKING, QuestionState.STATE_RATING].includes(questionState) && <Working />}
    </Box>
  );
};

export default WorkSpace;
