import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ToolIndex } from './consts';

const Latex = ({
  helpUrl,
  onSubmit,
  currentTool,
  defaultValue = '',
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [helpOpening, setHelpOpening] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [latex, setLatex] = useState(defaultValue);
  const [previewContent, setPreviewContent] = useState(null);

  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef && previewRef.current && previewContent.nodeType === Node.ELEMENT_NODE) {
      previewRef.current.appendChild(previewContent);
    }
  }, [previewContent]);

  const submit = async () => {
    if (latex.trim()) {
      setSubmitting(true);
      window.MathJax.texReset();
      // Workaround for newlines
      // https://github.com/mathjax/MathJax/issues/2312
      const node = await window.MathJax.tex2svgPromise(`\\displaylines{${latex.trim()}}`);
      const svg = node.querySelector('svg');
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      blob.name = 'latex.svg';
      await onSubmit({ file: blob });
      setSubmitting(false);
    }
  };

  const onHandleFocusLatexInput = (e) => {
    setPreviewMode(false);
    // Move the cursor to the end of the input when focus
    const val = e.target.value;
    e.target.value = '';
    e.target.value = val;
  };

  const onHandleBlurLatexInput = async () => {
    setPreviewMode(true);
    window.MathJax.texReset();
    // Workaround for newlines
    // https://github.com/mathjax/MathJax/issues/2312
    const node = await window.MathJax.tex2svgPromise(`\\displaylines{${latex.trim()}}`);
    const svg = node.querySelector('svg');
    setPreviewContent(svg);
  };

  return (
    <div
      data-testid="latex-tool"
      hidden={currentTool !== ToolIndex.LATEX}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {helpOpening && (
        <iframe
          data-testid="latex-help-iframe"
          src={helpUrl}
          title="Help"
          className="Card u-widthFull u-roundedMedium"
          style={{
            border: 'none',
            position: 'absolute',
            height: '300px',
            width: '100%',
            zIndex: 4,
            right: '100%',
          }}
        />
      )}
      <div
        className="u-marginBottom-2"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Button
            style={{
              zIndex: 4,
              marginBottom: 5,
            }}
            variant="contained"
            color="primary"
            size="small"
            data-testid="latex-help-button"
            onClick={() => {
              setHelpOpening(!helpOpening);
            }}
          >
            Latex Help
          </Button>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 77px)',
        }}
      >
        {!previewMode && (
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter your latex..."
            style={{ height: '100%', resize: 'none', width: '100%' }}
            data-testid="latex-input-area"
            value={latex}
            autoFocus
            onFocus={onHandleFocusLatexInput}
            onMouseLeave={onHandleBlurLatexInput}
            onChange={e => setLatex(e.target.value)}
          />
        )}
        {previewMode && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            style={{
              height: '100%',
              backgroundColor: '#fafbfc',
              color: '#97a0af',
              borderRadius: '4px',
              padding: '1rem',
              border: '1px solid #dfe1e6',
              overflow: 'scroll',
            }}
            data-testid="latex-preview-area"
            ref={previewRef}
            onClick={onHandleFocusLatexInput}
          />
        )}
      </div>
      <Button
        color="primary"
        variant="contained"
        size="small"
        className="u-marginTop-2"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '90px',
        }}
        data-testid="latex-insert-button"
        disabled={submitting}
        onClick={submit}
      >
        {submitting ? 'Inserting...' : 'Insert'}
      </Button>
    </div>
  );
};

export default Latex;
