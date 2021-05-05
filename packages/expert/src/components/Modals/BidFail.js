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

const BidFail = ({
  onModalClose,
}) => {
  const classes = useStyles();

  return (
    <Modal
      onHide={onModalClose}
      headerText="Sorry - you were outbid"
      body={(
        <>
          <Box className={classes.centerStyle}>
            <img src={warningIcon} alt="warning icon" style={{ width: 100, margin: 30 }} />
          </Box>
          <Box className={classes.centerStyle} style={{ fontWeight: 'bold' }}>
            Looks like another Expert either bid fewer credits or had a higher star rating than you. Try bidding lower or increasing your review scores to win more problems!
          </Box>
        </>
      )}
      footerType="single"
      onClickPrimaryButton={onModalClose}
      primaryButtonText="OK, Got It!"
    />
  );
};

export default BidFail;
