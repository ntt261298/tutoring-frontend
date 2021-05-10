import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getActiveQuestions } from 'actions/question';
import Title from 'components/Commons/Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ActiveQuestions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [totalActiveQuestions, setTotalActiveQuestions] = useState(null);

  const fetchQuestions = async () => {
    const { result } = await dispatch(getActiveQuestions());

    if (result) {
      setTotalActiveQuestions(result.activeQuestions);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <React.Fragment>
      <Title>Total Active Questions</Title>
      <Typography component="p" variant="h4">
        {totalActiveQuestions || 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        questions are in progress
      </Typography>
      <div>
        <Link color="primary" href="/home">
          View question list below
        </Link>
      </div>
    </React.Fragment>
  );
}
