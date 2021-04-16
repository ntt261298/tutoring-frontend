import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';
import { ModalContainer } from '@tutoring/commons/components';
import Feedback from './Feedback';
import Payment from './Payment';

const modalsMap = {
  [ModalKey.FEEDBACK]: Feedback,
  [ModalKey.PAYMENT]: Payment,
};

export default () => {
  const modalProps = useSelector(({ modal }) => modal);
  const dispatch = useDispatch();
  const handleShowModal = (modalName) => {
    dispatch(showModal(modalName));
  };

  return (
    <ModalContainer
      modalsMap={modalsMap}
      modalProps={modalProps}
      handleShowModal={handleShowModal}
    />
  );
};
