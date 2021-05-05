import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';
import { ModalContainer } from '@tutoring/commons/components';
import Feedback from './Feedback';
import BiddingDialog from './BiddingDialog';
import BidFail from './BidFail';

const modalsMap = {
  [ModalKey.FEEDBACK]: Feedback,
  [ModalKey.BIDDING_DIALOG]: BiddingDialog,
  [ModalKey.BID_FAIL]: BidFail,
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
