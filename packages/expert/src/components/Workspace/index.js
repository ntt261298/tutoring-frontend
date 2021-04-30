import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from '@tutoring/commons/components';
import { WorkspaceScreen } from 'constants/question';
import HeaderWorking from 'components/Commons/HeaderWorking';
import Waiting from './Waiting';
import Bidding from './Bidding';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
}));

const WorkSpace = () => {
  const classes = useStyles();
  const [screen, setScreen] = useState(WorkspaceScreen.BIDDING);

  return (
    <Box className={classes.container}>
      <CssBaseline />
      <HeaderWorking />
      {screen === WorkspaceScreen.WAITING && <Waiting />}
      {screen === WorkspaceScreen.BIDDING && <Bidding />}
    </Box>
  );
};

export default WorkSpace;
