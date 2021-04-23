import React from 'react';
import Box from '@material-ui/core/Box';
import { Modal } from '@tutoring/commons/components';

const PasswordInfo = ({
  onModalClose,
  email,
  password,
}) => (
  <Modal
    onHide={onModalClose}
    headerText="Expert's password"
    body={(
      <>
        <Box component="p" align="center">{`This is password for expert ${email}:`}</Box>
        <Box component="h2" align="center">{password}</Box>
        <Box component="p" align="center">Please save this email because this email will not be seen after closing this modal</Box>
      </>
    )}
    footerType="single"
    primaryButtonText="Ok! Got It"
    onClickPrimaryButton={onModalClose}
  />
);

export default PasswordInfo;
