import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getActiveExperts } from 'actions/expert';
import Title from 'components/Commons/Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ActiveExperts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [totalActiveExperts, setTotalActiveExperts] = useState(null);

  const fetchTransactions = async () => {
    const { result } = await dispatch(getActiveExperts());

    if (result) {
      setTotalActiveExperts(result.activeExperts);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <React.Fragment>
      <Title>Total Active Experts</Title>
      <Typography component="p" variant="h4">
        {totalActiveExperts || 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        experts are working or waiting for questions
      </Typography>
      <div>
        <Link color="primary" href="/home" onClick={preventDefault}>
          View expert list
        </Link>
      </div>
    </React.Fragment>
  );
}
