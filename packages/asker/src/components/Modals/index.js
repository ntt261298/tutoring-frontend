import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalKey } from 'constants/modal';
import { showModal } from 'actions/modal';
import { ModalContainer } from '@tutoring/commons/components';
import Feedback from './Feedback';
import Payment from './Payment';
import MatchingExpert from './MatchingExpert';
import InsufficientBalance from './InsufficientBalance';
import QuestionDead from './QuestionDead';
import Rate from './Rate';
import ActiveQuestion from './ActiveQuestion';

const modalsMap = {
  [ModalKey.FEEDBACK]: Feedback,
  [ModalKey.PAYMENT]: Payment,
  [ModalKey.MATCHING_EXPERT]: MatchingExpert,
  [ModalKey.INSUFFICIENT_BALANCE]: InsufficientBalance,
  [ModalKey.QUESTION_DEAD]: QuestionDead,
  [ModalKey.RATE]: Rate,
  [ModalKey.ACTIVE_QUESTION]: ActiveQuestion,
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
