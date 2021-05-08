import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PackageType } from 'constants/common';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';

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
  updateOption: {
    '&:hover': {
      cursor: 'pointer',
    },
    color: 'blue',
  },
});


export default function PackageList({
  subscriptionPackages, fetchSubscriptionList,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getExpiredTime = (packageType) => {
    if (packageType === PackageType.MONTHLY) {
      return '30 days';
    }
    if (packageType === PackageType.YEARLY) {
      return '365 days';
    }
    return 'Never';
  };

  const handleUpdatePackage = (item) => {
    dispatch(showModal(ModalKey.UPDATE_SUBSCRIPTION_PACKAGE, {
      item,
      onUpdateSuccess: () => fetchSubscriptionList(),
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Number of questions</StyledTableCell>
            <StyledTableCell align="center">Expired In</StyledTableCell>
            <StyledTableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptionPackages.map(item => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="center">{item.name}</StyledTableCell>
              <StyledTableCell align="center">
                $
                {item.price}
              </StyledTableCell>
              <StyledTableCell align="center">{item.numberOfQuestions || 'Unlimited'}</StyledTableCell>
              <StyledTableCell align="center">{getExpiredTime(item.type)}</StyledTableCell>
              <StyledTableCell
                align="center"
                className={classes.updateOption}
                onClick={() => handleUpdatePackage(item)}
              >
                update
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
