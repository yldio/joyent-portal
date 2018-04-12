import React from 'react';
import calcFill from './fill';

export default ({
  fill = null,
  light = false,
  disabled = false,
  colors = {},
  ...rest
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" {...rest}>
    <title>Artboard 1 copy 7</title>
    <path
      fill={calcFill({ fill, disabled, light, colors })}
      d="M21.7 5.15a15 15 0 1 0 15 15 15 15 0 0 0-15-15zm10.1 17.6a1.83 1.83 0 0 1-1.5 1.9 65.23 65.23 0 0 1-8.6.5 65.23 65.23 0 0 1-8.6-.5 1.83 1.83 0 0 1-1.5-1.9V17a2 2 0 0 1 1.5-1.9 17.57 17.57 0 0 1 2.7-.2.68.68 0 0 1 .7.7v4.1l5.3-.1 5.3.1v-4.1a.68.68 0 0 1 .7-.7 17.57 17.57 0 0 1 2.7.2A1.85 1.85 0 0 1 32 17a55.24 55.24 0 0 0-.2 5.8z"
    />
  </svg>
);
