import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageLayout from 'components/Commons/PageLayout';
import ActiveExperts from './ActiveExperts';
import ActiveQuestions from './ActiveQuestions';
import Deposits from './Deposits';
import Questions from './Questions/index';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <PageLayout>
      <Grid container spacing={3}>
        {/* Active Experts */}
        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
            <ActiveExperts />
          </Paper>
        </Grid>
        {/* Active Questions */}
        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
            <ActiveQuestions />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Questions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Questions />
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
