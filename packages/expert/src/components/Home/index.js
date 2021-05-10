import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ContactsIcon from '@material-ui/icons/Contacts';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';
import { Grid } from '@material-ui/core';
import { getInfo } from 'actions/user';
import { TopicId } from 'constants/question';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 220,
  },
  infoHeader: {
    height: 60,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorking: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  headerBoxItem: {
    width: '100%',
    marginBottom: 20,
  },
  headerBoxInfo: {
    backgroundColor: '#E1E2E1',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBoxContainer: {
    padding: '0 20px',
  },
  headerBoxDetail: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorkingIcon: {
    margin: 20,
    fontSize: 60,
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const calculateEarnings = (earnings) => {
    let total = 0;
    earnings.forEach((earning) => {
      total += earning.amount;
    });
    return total;
  };

  const getTopicRank = (ranks, topicId) => {
    let rankScore = 0;
    ranks.forEach((rank) => {
      if (rank.topicId === topicId) {
        rankScore = rank.scoreAvg;
      }
    });
    return rankScore;
  };

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Start working to help others and earn your money
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Box component="h2" className={classes.infoHeader}>
                {user.nickname && `Hello ${user.nickname}!`}
                {!user.nickname && 'Hello expert!'}
              </Box>
              <Grid container className={classes.headerBoxContainer} spacing={2}>
                <Grid item className={classes.headerBoxItem} xs={4}>
                  <Box className={classes.headerBoxInfo}>
                    Earnings
                  </Box>
                  <Box component="h2" className={classes.headerBoxDetail}>
                    {user.expertEarnings && calculateEarnings(user.expertEarnings)}
                  </Box>
                  <Box>
                    USD
                  </Box>
                </Grid>
                <Grid item className={classes.headerBoxItem} xs={4}>
                  <Box className={classes.headerBoxInfo}>
                    Ratings - Math
                  </Box>
                  <Box component="h2" className={classes.headerBoxDetail}>
                    {user.expertRanks && getTopicRank(user.expertRanks, TopicId.MATH)}
                  </Box>
                  <Box>
                    Per 5
                  </Box>
                </Grid>
                <Grid item className={classes.headerBoxItem} xs={4}>
                  <Box className={classes.headerBoxInfo}>
                    Ratings - English
                  </Box>
                  <Box component="h2" className={classes.headerBoxDetail}>
                    {user.expertRanks && getTopicRank(user.expertRanks, TopicId.ENGLISH)}
                  </Box>
                  <Box>
                    Per 5
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} onClick={() => history.push('/workspace')}>
              <Box component="h2" className={classes.startWorking}>
                <ContactsIcon className={classes.startWorkingIcon} />
                Start working
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
