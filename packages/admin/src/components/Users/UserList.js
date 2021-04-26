import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { showModal } from 'actions/modal';
import { deleteUser, undoDeleteUser } from 'actions/user';
import { ModalKey } from 'constants/modal';
import { AccountType, AccountStatus } from 'constants/common';
import { showSuccessMsg, showErrorMsg } from 'utils/toastr';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  deleteOption: {
    '&:hover': {
      cursor: 'pointer',
    },
    color: 'red',
  },
  updateOption: {
    '&:hover': {
      cursor: 'pointer',
    },
    color: 'blue',
  },
});


export default function UserList({
  users, fetchUserList, paginationData, defaultParams,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(paginationData.itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchUserList({
      ...defaultParams,
      page: newPage + 1,
      itemsPerPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newRowsPerPage);
    setPage(0);
    fetchUserList({
      ...defaultParams,
      page: page + 1,
      itemsPerPage: newRowsPerPage,
    });
  };

  const onDeleteUser = async (id) => {
    const { error } = await dispatch(deleteUser(id));
    if (error) {
      showErrorMsg(error?.errorMessage || 'Delete user failed!');
    } else {
      showSuccessMsg('Delete user successfully!');
      fetchUserList(defaultParams);
      setPage(0);
      setItemsPerPage(10);
    }
  };

  const onUndoDeleteUser = async (id) => {
    const { error } = await dispatch(undoDeleteUser(id));
    if (error) {
      showErrorMsg(error?.errorMessage || 'Undo delete user failed!');
    } else {
      showSuccessMsg('Undo delete user successfully!');
      fetchUserList(defaultParams);
      setPage(0);
      setItemsPerPage(10);
    }
  };

  const handleUpdateUser = (user) => {
    dispatch(showModal(ModalKey.UPDATE_USER, {
      user,
      onUpdateSuccess: () => fetchUserList(defaultParams),
    }));
  };

  const handleDeleteUser = (id, email) => {
    dispatch(showModal(ModalKey.CONFIRM_DELETE, {
      id,
      email,
      onDelete: () => onDeleteUser(id),
      type: AccountType.USER,
    }));
  };

  const handleUndoDeleteUser = (id, email) => {
    dispatch(showModal(ModalKey.CONFIRM_UNDO_DELETE, {
      id,
      email,
      onUndoDelete: () => onUndoDeleteUser(id),
      type: AccountType.USER,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Signup Date</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center" />
            <StyledTableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <StyledTableRow key={user.email}>
              <StyledTableCell component="th" scope="row">
                {user.id}
              </StyledTableCell>
              <StyledTableCell align="center">{user.created}</StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.status}</StyledTableCell>
              {user.status === AccountStatus.ACTIVE && (
                <>
                  <StyledTableCell
                    align="center"
                    className={classes.updateOption}
                    onClick={() => handleUpdateUser(user)}
                  >
                    update
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.deleteOption}
                    onClick={() => handleDeleteUser(user.id, user.email)}
                  >
                    delete
                  </StyledTableCell>
                </>
              )}
              {user.status === AccountStatus.DELETED && (
                <>
                  <StyledTableCell
                    align="center"
                  />
                  <StyledTableCell
                    align="center"
                    className={classes.deleteOption}
                    onClick={() => handleUndoDeleteUser(user.id, user.email)}
                  >
                    undo delete
                  </StyledTableCell>
                </>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={paginationData.totalItems}
              rowsPerPage={itemsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
