import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@tutoring/commons/components';
import warningIcon from 'assets/images/warning-icon.jpeg';

const useStyles = makeStyles(() => ({
  centerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const InsufficientBalance = ({
  onModalClose,
}) => {
  const classes = useStyles();

  return (
    <Modal
      onHide={onModalClose}
      headerText="Your question balance is insufficient!"
      body={(
        <>
          <Box className={classes.centerStyle}>
            <img src={warningIcon} alt="warning icon" />
          </Box>
          <Box className={classes.centerStyle} style={{ fontWeight: 'bold' }}>
            Please wait while our experts take a look at your questions make the decision...
          </Box>
        </>
      )}
      showFooter={false}
    />
  );
};

export default InsufficientBalance;
