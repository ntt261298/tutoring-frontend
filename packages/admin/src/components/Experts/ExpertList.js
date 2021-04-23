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
import Rating from '@material-ui/lab/Rating';
import { showModal } from 'actions/modal';
import { deleteExpert, undoDeleteExpert } from 'actions/expert';
import { ModalKey } from 'constants/modal';
import { AccountType, ExpertStatus, TopicId } from 'constants/common';
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

const findRatingByTopic = (ranks, topicId) => {
  const currentRank = ranks.find(rank => parseInt(rank.topicId, 10) === parseInt(topicId, 10));

  return currentRank?.scoreAvg || 0;
};


export default function ExpertList({
  experts, topicId, fetchExpertList, paginationData, defaultParams,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(paginationData.itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchExpertList({
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
    fetchExpertList({
      ...defaultParams,
      topicId,
      page: page + 1,
      itemsPerPage: newRowsPerPage,
    });
  };

  const onDeleteExpert = async (id) => {
    const { error } = await dispatch(deleteExpert(id));
    if (error) {
      showErrorMsg(error?.errorMessage || 'Delete expert failed!');
    } else {
      showSuccessMsg('Delete expert successfully!');
      fetchExpertList({
        ...defaultParams,
        topicId,
      });
      setPage(0);
      setItemsPerPage(10);
    }
  };

  const onUndoDeleteExpert = async (id) => {
    const { error } = await dispatch(undoDeleteExpert(id));
    if (error) {
      showErrorMsg(error?.errorMessage || 'Undo delete expert failed!');
    } else {
      showSuccessMsg('Undo delete expert successfully!');
      fetchExpertList({
        ...defaultParams,
        topicId,
      });
      setPage(0);
      setItemsPerPage(10);
    }
  };

  const handleUpdateExpert = (expert) => {
    dispatch(showModal(ModalKey.UPDATE_EXPERT, {
      expert,
      onUpdateSuccess: () => fetchExpertList({
        ...defaultParams,
        topicId,
      }),
    }));
  };

  const handleDeleteExpert = (id, email) => {
    dispatch(showModal(ModalKey.CONFIRM_DELETE, {
      id,
      email,
      onDelete: () => onDeleteExpert(id),
      type: AccountType.EXPERT,
    }));
  };

  const handleUndoDeleteExpert = (id, email) => {
    dispatch(showModal(ModalKey.CONFIRM_UNDO_DELETE, {
      id,
      email,
      onUndoDelete: () => onUndoDeleteExpert(id),
      type: AccountType.EXPERT,
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
            {topicId !== TopicId.ALL && (
              <StyledTableCell align="center">Rating</StyledTableCell>
            )}
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center" />
            <StyledTableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {experts.map(expert => (
            <StyledTableRow key={expert.email}>
              <StyledTableCell component="th" scope="row">
                {expert.id}
              </StyledTableCell>
              <StyledTableCell align="center">{expert.created}</StyledTableCell>
              <StyledTableCell align="center">{expert.email}</StyledTableCell>
              {topicId !== TopicId.ALL && (
                <StyledTableCell align="center">
                  <Rating
                    value={findRatingByTopic(expert.expertRanks, topicId)}
                    readOnly
                  />
                </StyledTableCell>
              )}
              <StyledTableCell align="center">{expert.status}</StyledTableCell>
              {expert.status === ExpertStatus.ACTIVE && (
                <>
                  <StyledTableCell
                    align="center"
                    className={classes.updateOption}
                    onClick={() => handleUpdateExpert(expert)}
                  >
                    update
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.deleteOption}
                    onClick={() => handleDeleteExpert(expert.id, expert.email)}
                  >
                    delete
                  </StyledTableCell>
                </>
              )}
              {expert.status === ExpertStatus.DELETED && (
                <>
                  <StyledTableCell
                    align="center"
                  />
                  <StyledTableCell
                    align="center"
                    className={classes.deleteOption}
                    onClick={() => handleUndoDeleteExpert(expert.id, expert.email)}
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
