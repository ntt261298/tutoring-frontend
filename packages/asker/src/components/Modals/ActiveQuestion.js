import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@tutoring/commons/components';

const useStyles = makeStyles(() => ({
  centerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ActiveQuestion = ({
  onModalClose,
  questionId,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const handleContinueQuestion = () => {
    history.push(`/question/${questionId}`);
    onModalClose();
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="You have an active question!"
      body={(
        <>
          <Box className={classes.centerStyle} style={{ fontWeight: 'bold' }}>
            Continue with your current question
          </Box>
        </>
      )}
      footerType="single"
      onClickPrimaryButton={handleContinueQuestion}
      primaryButtonText="OK"
    />
  );
};

export default ActiveQuestion;
