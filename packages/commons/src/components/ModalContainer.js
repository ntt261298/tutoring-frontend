import React from 'react';

export function ModalContainer({
  modalsMap,
  modalProps,
  handleShowModal,
}) {
  const handleModalClose = () => {
    // Hide displaying modal
    handleShowModal(null);
  };

  const { displayModal, onModalClose, ...rest } = modalProps;
  const RenderedModal = modalsMap[displayModal];
  const currentProps = {
    ...rest,
    onModalClose: (e) => {
      handleModalClose();
      // eslint-disable-next-line no-unused-expressions
      onModalClose && onModalClose(e);
    },
  };

  return RenderedModal
    ? <RenderedModal {...currentProps} />
    : null;
}

export default ModalContainer;
