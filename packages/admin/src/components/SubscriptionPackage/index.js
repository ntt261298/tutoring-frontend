import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageLayout from 'components/Commons/PageLayout';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import PackageList from 'components/SubscriptionPackage/PackageList';
import { getSubscriptionPackages } from 'actions/subscriptionPackage';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  alignVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addCircleIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  search: {
    marginBottom: 20,
  },
  formControl: {
    marginTop: 15,
  },
  submitButton: {
    width: 200,
    marginBottom: 20,
  },
}));

export default function SubscriptionPackage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [subscriptionPackages, setSubscriptionPackages] = useState([]);

  const fetchSubscriptionList = async () => {
    const { result } = await dispatch(getSubscriptionPackages());
    if (result) {
      setSubscriptionPackages(result.subscriptionPackages);
    }
  };

  useEffect(() => {
    fetchSubscriptionList();
  }, []);

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box component="h2">
                  <SearchIcon />
                  {' '}
                  Subscription Packages
                </Box>
              </Grid>
            </Grid>
            <PackageList
              subscriptionPackages={subscriptionPackages}
              fetchSubscriptionList={fetchSubscriptionList}
            />
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
