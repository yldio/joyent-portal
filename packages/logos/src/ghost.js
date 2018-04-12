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
    <title>Artboard 1 copy 16</title>
    <path
      fill={calcFill({ fill, disabled, light, colors })}
      d="M3 30.8h14.4V38H3zm21.6 0H39V38H24.6zM3 16.4h36v7.2H3zM3 2h21.6v7.2H3zm28.8 0H39v7.2h-7.2z"
    />
  </svg>
);
