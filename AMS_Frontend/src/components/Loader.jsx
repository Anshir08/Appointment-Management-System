// Loader.jsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ size = 60, color = 'primary', fullScreen = true }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullScreen ? '100vh' : '100%'}
      width="100%"
    >
        <h1>Give us a second!</h1>
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default Loader;
