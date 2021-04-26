import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageLayout from 'components/Commons/PageLayout';
import UserList from 'components/Users/UserList';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';
import { getUsers } from 'actions/user';

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
  ids: '',
  email: '',
  page: 0,
  itemsPerPage: 10,
};

export default function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ids, setIds] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 10,
    totalItems: 10,
  });

  const fetchUserList = async (params) => {
    const { result } = await dispatch(getUsers(params));
    if (result) {
      setUsers(result.users);
      setPaginationData({
        itemsPerPage: result.itemsPerPage,
        totalItems: result.totalItems,
      });
    }
  };

  const handleSearch = () => {
    fetchUserList({
      ids,
      email,
      page: 1,
      itemsPerPage: 10,
    });
  };

  useEffect(() => {
    fetchUserList(DefaultParams);
  }, []);

  const handleAddUser = () => {
    dispatch(showModal(ModalKey.ADD_USER, {
      onAddSuccess: () => fetchUserList(DefaultParams),
    }));
  };

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
              <Grid item xs={6} className={classes.alignVertical}>
                <AddCircleIcon
                  fontSize="large"
                  color="primary"
                  className={classes.addCircleIcon}
                  onClick={handleAddUser}
                />
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
            <UserList
              users={users}
              paginationData={paginationData}
              fetchUserList={fetchUserList}
              defaultParams={DefaultParams}
            />
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
