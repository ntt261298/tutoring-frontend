import React from 'react';
import Box from '@material-ui/core/Box';
import expertWorkingLogo from 'assets/images/expert-working.png';

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Waiting = () => (
  <>
    <Box style={centerStyle}>
      <img src={expertWorkingLogo} alt="expert working" />
    </Box>
    <Box style={{ ...centerStyle, fontWeight: 'bold' }}>
      Waiting for questions from users...
    </Box>
  </>
);

export default Waiting;
