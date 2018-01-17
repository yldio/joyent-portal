import React from 'react';

import Rotate from './rotate';
import calcFill from './fill';

export default ({
  fill = null,
  light = false,
  disabled = false,
  direction = 'down',
  colors = {},
  style = {},
  ...rest
}) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) => (
      <svg
        width="12"
        height="17"
        viewBox="0 0 12 17"
        xmlns="http://www.w3.org/2000/svg"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M4 0v1H0v2h12V1H8.001V0H4zM1 17h10V4H1v13z"
          fillRule="evenodd"
        />
      </svg>
    )}
  </Rotate>
);
