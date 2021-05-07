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
import Rating from '@material-ui/lab/Rating';
import { TopicId } from 'constants/common';

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


export default function QuestionList({
  questions, topicId, fetchQuestionList, paginationData, defaultParams, setSelectedQuestion,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(paginationData.itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchQuestionList({
      ...defaultParams,
      topicId,
      page: newPage + 1,
      itemsPerPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newRowsPerPage);
    setPage(0);
    fetchQuestionList({
      ...defaultParams,
      topicId,
      page: page + 1,
      itemsPerPage: newRowsPerPage,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Asked Date</StyledTableCell>
            <StyledTableCell align="center">Content</StyledTableCell>
            {topicId !== TopicId.ALL && (
              <StyledTableCell align="center">Expert ID</StyledTableCell>
            )}
            <StyledTableCell align="center">Your Rate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map(question => (
            <StyledTableRow key={question.id}>
              <StyledTableCell component="th" scope="row">
                {question.id}
              </StyledTableCell>
              <StyledTableCell align="center">{question.created}</StyledTableCell>
              <StyledTableCell
                align="center"
                className={classes.updateOption}
                onClick={() => setSelectedQuestion(question)}
              >
                {question.text}
              </StyledTableCell>
              <StyledTableCell align="center">{question.expertId}</StyledTableCell>
              {topicId !== TopicId.ALL && (
                <StyledTableCell align="center">
                  <Rating
                    value={question.userRating?.score}
                    readOnly
                  />
                </StyledTableCell>
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
