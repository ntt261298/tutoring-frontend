import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { TopicId } from 'constants/common';
import { getExperts } from 'actions/expert';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';
import ExpertList from 'components/FindExpert/ExpertList';

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
  ids: '',
  email: '',
  topicId: TopicId.MATH,
  page: 1,
  itemsPerPage: 10,
};

export default function FindExpert() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ids, setIds] = useState('');
  const [email, setEmail] = useState('');
  const [topicId, setTopicId] = useState(TopicId.MATH);
  const [searchedTopicId, setSearchTopicId] = useState(TopicId.MATH);
  const [experts, setExperts] = useState([]);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 10,
    totalItems: 10,
  });

  const fetchExpertList = async (params) => {
    const { result } = await dispatch(getExperts(params));
    if (result) {
      setExperts(result.experts);
      setPaginationData({
        itemsPerPage: result.itemsPerPage,
        totalItems: result.totalItems,
      });
    }
  };

  const handleSearch = () => {
    setSearchTopicId(topicId);
    fetchExpertList({
      ids,
      email,
      topicId,
      page: 1,
      itemsPerPage: 10,
    });
  };

  useEffect(() => {
    fetchExpertList(DefaultParams);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box component="h2">
                <SearchIcon />
                {' '}
                Search Experts
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.search}>
            <Grid item xs={4}>
              <TextField
                className={classes.textField}
                label="Ids"
                fullWidth
                value={ids}
                onChange={e => setIds(e.target.value)}
              />
            </Grid>
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
              <FormControl className={classes.formControl}>
                <Select
                  value={topicId}
                  onChange={e => setTopicId(e.target.value)}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="" disabled>Topic</MenuItem>
                  <MenuItem value={TopicId.ENGLISH}>English</MenuItem>
                  <MenuItem value={TopicId.MATH}>Math</MenuItem>
                  <MenuItem value={TopicId.ALL}>All</MenuItem>
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
          <ExpertList
            experts={experts}
            topicId={searchedTopicId}
            paginationData={paginationData}
            fetchExpertList={fetchExpertList}
            defaultParams={DefaultParams}
          />
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}
