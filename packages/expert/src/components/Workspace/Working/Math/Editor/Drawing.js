import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { ToolIndex } from './consts';

const Drawing = ({
  drawingToolUrl,
  onSubmit,
  currentTool,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const frameRef = useRef(null);

  const submit = async () => {
    setSubmitting(true);
    const canvas = frameRef.current.contentWindow.getImage && frameRef.current.contentWindow.getImage();

    if (!canvas) {
      setSubmitting(false);
      return;
    }

    canvas.toBlob(async (blob) => {
      // eslint-disable-next-line no-param-reassign
      blob.name = 'draw.png';
      await onSubmit({ file: blob });
      setSubmitting(false);
    });
  };

  return (
    <div
      data-testid="drawing-tool"
      hidden={currentTool !== ToolIndex.DRAWING}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <iframe
        data-testid="drawing-iframe"
        ref={frameRef}
        title="free-drawing-input"
        src={drawingToolUrl}
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
        }}
        frameBorder={0}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          position: 'absolute',
          right: 40,
          bottom: 20,
          width: '90px',
        }}
        data-testid="drawing-insert-button"
        disabled={submitting}
        onClick={submit}
      >
        {submitting ? 'Inserting...' : 'Insert'}
      </Button>
    </div>
  );
};

export default Drawing;
