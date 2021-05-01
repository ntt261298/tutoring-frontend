import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import config from 'configuration';
import { Tool, ToolIndex } from './consts';
import Latex from './Latex';
import Drawing from './Drawing';

const Editor = ({
  toolMenuStyle = {},
  editorStyle = {},
  onReceiveResult = () => {},
}) => {
  const [currentTool, setCurrentTool] = useState(ToolIndex.LATEX);

  const handleToolChange = (event, newValue) => {
    setCurrentTool(newValue);
  };

  const renderToolMenu = () => (
    <div
      style={toolMenuStyle}
    >
      <Tabs
        value={currentTool}
        onChange={handleToolChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={Tool.LATEX} />
        <Tab label={Tool.DRAWING} />
      </Tabs>
    </div>
  );

  return (
    <Paper data-testid="editor" style={editorStyle}>
      <Latex
        currentTool={currentTool}
        helpUrl={config.latexHelp}
        onSubmit={value => onReceiveResult(value)}
      />
      <Drawing
        currentTool={currentTool}
        drawingToolUrl={config.drawingToolUrl}
        onSubmit={value => onReceiveResult(value)}
      />
      {renderToolMenu()}
    </Paper>
  );
};

export default Editor;
