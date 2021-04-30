import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { showModal } from 'actions/modal';
import { ModalKey } from 'constants/modal';

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
  endSession: {
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

const HeaderWorking = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={() => history.push('/home')}>
          Tutoring company
        </Typography>
        <nav>
          <Button className={classes.endSession} onClick={() => dispatch(showModal(ModalKey.FEEDBACK))}>
            End Session
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderWorking;
