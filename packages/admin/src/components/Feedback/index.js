import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageLayout from 'components/Commons/PageLayout';
import FeedbackList from 'components/Feedback/FeedbackList';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getFeedback } from 'actions/feedback';
import { AccountType } from 'constants/common';

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

const DefaultParams = {
  email: '',
  content: '',
  accountType: AccountType.USER,
  page: 0,
  itemsPerPage: 10,
};

export default function Feedback() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [accountType, setAccountType] = useState(AccountType.USER);
  const [searchedAccountType, setSearchedAccountType] = useState(AccountType.USER);
  const [feedback, setFeedback] = useState([]);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 10,
    totalItems: 10,
  });

  const fetchFeedbackList = async (params) => {
    const { result } = await dispatch(getFeedback(params));
    if (result) {
      setFeedback(result.feedback);
      setPaginationData({
        itemsPerPage: result.itemsPerPage,
        totalItems: result.totalItems,
      });
    }
  };

  const handleSearch = () => {
    setSearchedAccountType(accountType);
    fetchFeedbackList({
      email,
      content,
      accountType,
      page: 1,
      itemsPerPage: 10,
    });
  };

  useEffect(() => {
    fetchFeedbackList(DefaultParams);
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
                  Search
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.search}>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  label="Content"
                  fullWidth
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={accountType}
                    onChange={e => setAccountType(e.target.value)}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>Account Type</MenuItem>
                    <MenuItem value={AccountType.USER}>User</MenuItem>
                    <MenuItem value={AccountType.EXPERT}>Expert</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={handleSearch}
            >
              Search
            </Button>
            {' '}
            <FeedbackList
              feedback={feedback}
              accountType={searchedAccountType}
              paginationData={paginationData}
              fetchFeedbackList={fetchFeedbackList}
              defaultParams={DefaultParams}
            />
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
