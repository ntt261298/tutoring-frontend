import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getTransactions } from 'actions/transaction';
import Title from 'components/Commons/Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = new Date();
  const [totalEarnings, setTotalEarnings] = useState(null);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const getTotalEarnings = (transactions) => {
    let total = 0;
    transactions.forEach((transaction) => {
      total += transaction.amount;
    });
    return total;
  };

  const fetchTransactions = async () => {
    const { result } = await dispatch(getTransactions());

    if (result) {
      setTotalEarnings(getTotalEarnings(result.transactions));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <React.Fragment>
      <Title>Total Revenue</Title>
      <Typography component="p" variant="h4">
        $
        {totalEarnings || 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        until
        {' '}
        {`${monthNames[date.getMonth()]} ${date.getDate()}th, ${date.getFullYear()}`}
      </Typography>
      <div>
        <Link color="primary" href="/home" onClick={preventDefault}>
          View current month revenue
        </Link>
      </div>
    </React.Fragment>
  );
}
