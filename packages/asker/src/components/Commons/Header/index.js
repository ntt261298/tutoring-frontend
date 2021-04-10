import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from 'components/Commons/Header/DropdownMenu';

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
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();

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
          <Link variant="button" color="textPrimary" href="/my-questions" className={classes.link}>
            My Questions
          </Link>
          <Link variant="button" color="textPrimary" href="/feedback" className={classes.link}>
            Feedback
          </Link>
        </nav>
        <DropdownMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
