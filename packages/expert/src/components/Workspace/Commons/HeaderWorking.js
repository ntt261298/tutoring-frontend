import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { disconnect } from 'actions/user';
import { getState, endSession } from 'actions/question';
import { QuestionState } from 'constants/question';
import BiddingTimer from 'components/Workspace/Bidding/BiddingTimer';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  actionButton: {
    margin: theme.spacing(1, 1.5),
    fontSize: '0.875rem',
    fontWeight: 500,
    backgroundColor: theme.palette.warning.dark,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  timer: {
    textAlign: 'center',
  },
}));

const HeaderWorking = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const questionState = useSelector(state => state.question?.state);
  const questionInfo = useSelector(state => state.question?.questionInfo);
  const remainClaimTime = useSelector(state => state.question?.remainClaimTime || 0);

  const stopWorking = async () => {
    await dispatch(disconnect());
    history.push('/home');
    dispatch(getState());
  };

  const handleEndSession = () => {
    dispatch(endSession(questionInfo?.id));
  };

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={() => history.push('/home')}>
          Tutoring company
        </Typography>
        <Box className={classes.timer}>
          {[QuestionState.STATE_BIDDING, QuestionState.STATE_KING].includes(questionState) && (
            <BiddingTimer
              remainingTime={remainClaimTime}
              onTimeout={() => {}}
            />
          )}
        </Box>
        <nav>
          {[QuestionState.STATE_NOT_ROUTED, QuestionState.STATE_BIDDING, QuestionState.STATE_KING].includes(questionState) && (
            <Button className={classes.actionButton} onClick={() => stopWorking()}>
              Stop Working
            </Button>
          )}
          {[QuestionState.STATE_WORKING, QuestionState.STATE_RATING].includes(questionState) && (
            <Button className={classes.actionButton} onClick={() => handleEndSession()}>
              End Session
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderWorking;
