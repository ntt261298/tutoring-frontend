import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@tutoring/commons/components';
import userAskingLogo from 'assets/images/user-asking.png';

const useStyles = makeStyles(() => ({
  centerStyle: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const MatchingExpert = () => {
  const classes = useStyles();

  return (
    <Modal
      closable={false}
      headerText="Routing question to our experts!"
      body={(
        <>
          <Box className={classes.centerStyle}>
            <img src={userAskingLogo} alt="user asking" width={400} />
          </Box>
          <Box className={classes.centerStyle} style={{ fontWeight: 'bold' }}>
            Please wait while our experts take a look at your questions
            {' '}
            <br />
            and make the decision...
          </Box>
        </>
      )}
      showFooter={false}
    />
  );
};

export default MatchingExpert;
