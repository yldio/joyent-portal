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
    <title>Artboard 1 copy 5</title>
    <path
      fill={calcFill({ fill, disabled, light, colors })}
      d="M5.73 9L18 7.25v11.8l-12.3.1zM18 20.55v11.8l-12.3-1.7v-10.2zm1.5-13.4l16.3-2.4v14.3l-16.3.1zm16.2 13.5v14.2l-16.3-2.3v-11.9z"
    />
  </svg>
);
