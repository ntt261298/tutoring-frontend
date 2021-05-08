import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';
import { ModalContainer } from '@tutoring/commons/components';
import AddExpert from './AddExpert';
import PasswordInfo from './PasswordInfo';
import ConfirmDelete from './ConfirmDelete';
import UpdateExpert from './UpdateExpert';
import ConfirmUndoDelete from './ConfirmUndoDelete';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import UpdateSubscriptionPackage from './UpdateSubscriptionPackage';

const modalsMap = {
  [ModalKey.ADD_EXPERT]: AddExpert,
  [ModalKey.PasswordInfo]: PasswordInfo,
  [ModalKey.CONFIRM_DELETE]: ConfirmDelete,
  [ModalKey.UPDATE_EXPERT]: UpdateExpert,
  [ModalKey.CONFIRM_UNDO_DELETE]: ConfirmUndoDelete,
  [ModalKey.ADD_USER]: AddUser,
  [ModalKey.UPDATE_USER]: UpdateUser,
  [ModalKey.UPDATE_SUBSCRIPTION_PACKAGE]: UpdateSubscriptionPackage,
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
