import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import { getEarnings } from 'actions/user';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';
import EarningList from 'components/Earnings/EarningList';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
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

const DefaultParams = {
  page: 1,
  itemsPerPage: 10,
};

export default function Earnings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState([]);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 10,
    totalItems: 10,
  });

  const fetchEarningList = async (params) => {
    const { result } = await dispatch(getEarnings(params));
    if (result) {
      setEarnings(result.earnings);
      setPaginationData({
        itemsPerPage: result.itemsPerPage,
        totalItems: result.totalItems,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarningList(DefaultParams);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {loading && (
      <Box
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Connecting...
      </Box>
      )}
      {!loading && earnings.length === 0 && (
        <Box component="h2" align="center" style={{ minHeight: '40vh', paddingTop: '100px' }}>
          You have no earning
        </Box>
      )}
      {!loading && earnings.length > 0 && (
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box component="h2">
                  <SearchIcon />
                  {' '}
                  Your Earnings
                </Box>
              </Grid>
            </Grid>
            <EarningList
              earnings={earnings}
              paginationData={paginationData}
              fetchTransactionList={fetchEarningList}
              defaultParams={DefaultParams}
            />
          </Grid>
        </Grid>
      )}
      <Footer />
    </React.Fragment>
  );
}
