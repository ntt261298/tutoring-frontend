import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageLayout from 'components/Commons/PageLayout';
import ExpertList from 'components/Experts/ExpertList';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  alignVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addCircleIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function Experts() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddExpert = () => {
    dispatch(showModal(ModalKey.ADD_EXPERT));
  };

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box component="h2">Experts</Box>
              </Grid>
              <Grid item xs={6} className={classes.alignVertical}>
                <AddCircleIcon
                  fontSize="large"
                  color="primary"
                  className={classes.addCircleIcon}
                  onClick={handleAddExpert}
                />
              </Grid>
            </Grid>
            <ExpertList />
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
