import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { getStatistics } from 'actions/statistic';
import PageLayout from 'components/Commons/PageLayout';
import Revenue from './Revenue';
import MostAskedQuestion from './MostAskedQuestion';
import MostBoughtPackage from './MostBoughtPackage';

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Statistics = () => {
  const dispatch = useDispatch();
  const [statistics, setStatistics] = useState({});

  const fetchStatistic = async () => {
    const { result } = await dispatch(getStatistics());

    if (result) {
      setStatistics(result);
    }
  };

  useEffect(() => {
    fetchStatistic();
  }, []);


  return (
    <PageLayout>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <Box style={{ padding: 40 }}>
              <Revenue data={statistics.revenue} />
            </Box>
          </Grid>
          <Grid item xs={6} style={centerStyle}>
            <Grid container>
              <Grid item xs={12} style={centerStyle}>
                <MostAskedQuestion data={statistics.askedQuestions} />
              </Grid>
              <Grid item xs={12} style={centerStyle}>
                <Box component="h3" style={{ marginTop: -100 }}>Most Asked Questions</Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={centerStyle}>
            <Grid container>
              <Grid item xs={12} style={centerStyle}>
                <MostBoughtPackage data={statistics.boughtPackages} />
              </Grid>
              <Grid item xs={12} style={centerStyle}>
                <Box component="h3" style={{ marginTop: -100 }}>Most Bought Package</Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </PageLayout>
  );
};

export default Statistics;
