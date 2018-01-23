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
        width="20.25"
        height="14"
        viewBox="0 0 24 16"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M13.25 0a7 7 0 0 0-3.13.74A7 7 0 1 0 7 14a7 7 0 0 0 3.12-.74A7 7 0 1 0 13.25 0zM12 7a5 5 0 0 1-1.88 3.87 4.94 4.94 0 0 1 0-7.74A5 5 0 0 1 12 7zM2 7a5 5 0 0 1 5-5 5.26 5.26 0 0 1 1.2.16 7 7 0 0 0 0 9.68A5.26 5.26 0 0 1 7 12a5 5 0 0 1-5-5zm11.25 5a5.26 5.26 0 0 1-1.2-.16 7 7 0 0 0 0-9.68 5.26 5.26 0 0 1 1.2-.16 5 5 0 0 1 0 10z"
        />
      </svg>
    )}
  </Rotate>
);
