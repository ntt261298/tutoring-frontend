import React from 'react';
import Typography from '@material-ui/core/Typography';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright © Truong Nguyen
    {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Copyright;
