import React from 'react';
import Box from '@material-ui/core/Box';
import { Modal } from '@tutoring/commons/components';
import { AccountType } from 'constants/common';

const ConfirmDelete = ({
  email,
  type,
  onDelete,
  onModalClose,
}) => {
  const confirmDelete = () => {
    onDelete();
    onModalClose();
  };

  return (
    <Modal
      onHide={onModalClose}
      headerText="Delete confirmation"
      body={(
        <>
          <Box component="p" align="center">{`Are you sure to delete ${type === AccountType.EXPERT ? 'expert' : 'user'} ${email}?`}</Box>
        </>
    )}
      footerType="double"
      primaryButtonText="Yes"
      onClickPrimaryButton={confirmDelete}
      secondaryButtonText="No"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default ConfirmDelete;
