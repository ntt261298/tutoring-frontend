import React, { useState } from 'react';
import { Modal } from '@tutoring/commons/components';

const Feedback = ({
  onModalClose,
}) => {
  const [content, setContent] = useState('');

  return (
    <Modal
      headerText="Give us your feedback!"
      body={(
        <>
          Feedback
        </>
      )}
      footerType="double"
      primaryButtonText="Submit"
      onClickPrimaryButton={() => {}}
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onModalClose}
    />
  );
};

export default Feedback;
