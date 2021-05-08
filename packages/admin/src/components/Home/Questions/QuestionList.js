import React, { useState } from 'react';
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


export default function QuestionList({
  questions, topicId, fetchQuestionList, paginationData, defaultParams,
}) {
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center" width={150}>Asked Date</TableCell>
            <TableCell align="center">Content</TableCell>
            <TableCell align="center">User ID</TableCell>
            <TableCell align="center">Expert ID</TableCell>
            <TableCell align="center">User Rate</TableCell>
            <TableCell align="center">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map(question => (
            <TableRow key={question.id}>
              <TableCell component="th" scope="row">
                {question.id}
              </TableCell>
              <TableCell align="center" width={100}>{question.created}</TableCell>
              <TableCell
                align="center"
              >
                {question.text}
              </TableCell>
              <TableCell align="center">{question.userId}</TableCell>
              <TableCell align="center">{question.expertId || 'No expert'}</TableCell>
              {topicId !== TopicId.ALL && (
                <TableCell align="center">
                  <Rating
                    value={question.userRating?.score}
                    readOnly
                  />
                </TableCell>
              )}
              <TableCell align="center">{question.questionState?.state}</TableCell>
            </TableRow>
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
