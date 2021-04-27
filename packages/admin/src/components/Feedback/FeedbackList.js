import React, { useState } from 'react';
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


export default function FeedbackList({
  feedback, accountType, fetchFeedbackList, paginationData, defaultParams,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(paginationData.itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchFeedbackList({
      ...defaultParams,
      accountType,
      page: newPage + 1,
      itemsPerPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newRowsPerPage);
    setPage(0);
    fetchFeedbackList({
      ...defaultParams,
      accountType,
      page: page + 1,
      itemsPerPage: newRowsPerPage,
    });
  };

  const getAccountType = (item) => {
    if (item.expertId) {
      return 'Expert';
    }
    return 'User';
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Signup Date</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Account Type</StyledTableCell>
            <StyledTableCell align="center">Content</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedback.map(item => (
            <StyledTableRow key={item.email}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="center">{item.created}</StyledTableCell>
              <StyledTableCell align="center">{item.email}</StyledTableCell>
              <StyledTableCell align="center">{getAccountType(item)}</StyledTableCell>
              <StyledTableCell align="center">{item.content}</StyledTableCell>
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
