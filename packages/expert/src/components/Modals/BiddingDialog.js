import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal } from '@tutoring/commons/components';

const useStyles = makeStyles(() => ({
  centerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const BidFail = () => {
  const classes = useStyles();

  return (
    <Modal
      headerText="Waiting other experts!"
      body={(
        <>
          <Box className={classes.centerStyle}>
            <CircularProgress />
          </Box>
          <Box className={classes.centerStyle} style={{ fontWeight: 'bold' }}>
            Please wait while the system decides who will answer the question
          </Box>
        </>
      )}
      showFooter={false}
      closable={false}
    />
  );
};

export default BidFail;
