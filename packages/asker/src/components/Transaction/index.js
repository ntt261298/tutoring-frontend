import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import { getTransactions } from 'actions/user';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';
import TransactionList from 'components/Transaction/TransactionList';

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

export default function Transaction() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 10,
    totalItems: 10,
  });

  const fetchTransactionList = async (params) => {
    const { result } = await dispatch(getTransactions(params));
    if (result) {
      setTransactions(result.transactions);
      setPaginationData({
        itemsPerPage: result.itemsPerPage,
        totalItems: result.totalItems,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionList(DefaultParams);
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
      {!loading && transactions.length === 0 && (
        <Box component="h2" align="center" style={{ minHeight: '40vh', paddingTop: '100px' }}>
          You have no transaction
        </Box>
      )}
      {!loading && transactions.length > 0 && (
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box component="h2">
                <SearchIcon />
                {' '}
                Your Transactions
              </Box>
            </Grid>
          </Grid>
          <TransactionList
            transactions={transactions}
            paginationData={paginationData}
            fetchTransactionList={fetchTransactionList}
            defaultParams={DefaultParams}
          />
        </Grid>
      </Grid>
      )}
      <Footer />
    </React.Fragment>
  );
}
