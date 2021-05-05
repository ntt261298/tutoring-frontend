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

const QuestionDead = ({
  onModalClose,
}) => {
  const classes = useStyles();

  return (
    <Modal
      onHide={onModalClose}
      headerText="Oops!"
      body={(
        <>
          <Box className={classes.centerStyle}>
            <img src={warningIcon} alt="warning icon" style={{ width: 100, margin: 30 }} />
          </Box>
          <Box className={classes.centerStyle} style={{ fontWeight: 'bold' }}>
            Looks like our Experts are working with other customers right now. Please post your request a bit later and we’ll be happy to assist you. Thanks!
          </Box>
        </>
      )}
      footerType="single"
      onClickPrimaryButton={onModalClose}
      primaryButtonText="OK, Got It!"    
    />
  );
};

export default QuestionDead;
