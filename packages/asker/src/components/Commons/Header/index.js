import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DropdownMenu from 'components/Commons/Header/DropdownMenu';
import { showModal } from 'actions/modal';
import { ModalKey } from 'constants/modal';
import { SubscriptionStatus } from 'constants/common';

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
  link: {
    margin: theme.spacing(1, 1.5),
  },
  feedback: {
    margin: theme.spacing(1, 1.5),
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const freeCreditBalance = useSelector(({ user }) => user.freeCreditBalance || 0);
  const paidCreditBalance = useSelector(({ user }) => user.paidCreditBalance || 0);
  const isSubscriber = useSelector(({ userSubscription }) => userSubscription.status === SubscriptionStatus.ACTIVE);
  const questionBalance = isSubscriber ? 'Unlimited' : (freeCreditBalance + paidCreditBalance);

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={() => history.push('/home')}>
          Tutoring company
        </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="/pricing" className={classes.link}>
            Pricing
          </Link>
          <Link variant="button" color="textPrimary" href="/question-history" className={classes.link}>
            My Questions
          </Link>
          <Box component="span" color="textPrimary" className={classes.feedback} onClick={() => dispatch(showModal(ModalKey.FEEDBACK))}>
            Feedback
          </Box>
          <Button
            variant="outlined"
          >
            {`Question Balance:  ${questionBalance}`}
          </Button>
        </nav>
        <DropdownMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
