import React from 'react';
import Box from '@material-ui/core/Box';
import { Modal } from '@tutoring/commons/components';
import { AccountType } from 'constants/common';

const ConfirmUndoDelete = ({
  email,
  type,
  onUndoDelete,
  onModalClose,
}) => {
  const confirmUndoDelete = () => {
    onUndoDelete();
    onModalClose();
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="Undo delete confirmation"
      body={(
        <>
          <Box component="p" align="center">{`Are you sure to undo delete ${type === AccountType.EXPERT ? 'expert' : 'user'} ${email}?`}</Box>
        </>
    )}
      footerType="double"
      primaryButtonText="Yes"
      onClickPrimaryButton={confirmUndoDelete}
      secondaryButtonText="No"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default ConfirmUndoDelete;
