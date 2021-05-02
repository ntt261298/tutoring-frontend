import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { showModal } from 'actions/modal';
import { disconnect } from 'actions/user';
import { getState } from 'actions/question';
import { ModalKey } from 'constants/modal';
import { QuestionState } from 'constants/question';

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
}));

const HeaderWorking = ({
  questionState,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const stopWorking = async () => {
    await dispatch(disconnect());
    history.push('/home');
    dispatch(getState());
  };

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={() => history.push('/home')}>
          Tutoring company
        </Typography>
        <nav>
          {[QuestionState.STATE_NOT_ROUTED, QuestionState.STATE_BIDDING, QuestionState.STATE_KING].includes(questionState) && (
            <Button className={classes.actionButton} onClick={() => stopWorking()}>
              Stop Working
            </Button>
          )}
          {[QuestionState.STATE_WORKING, QuestionState.STATE_RATING].includes(questionState) && (
            <Button className={classes.actionButton} onClick={() => dispatch(showModal(ModalKey.FEEDBACK))}>
              End Session
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderWorking;
