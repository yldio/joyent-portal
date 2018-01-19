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
        xmlns="http://www.w3.org/2000/svg"
        width="11.31"
        height="11.31"
        viewBox="0 0 11.31 11.31"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M11.31,1.41,9.9,0,5.66,4.24,1.41,0,0,1.41,4.24,5.66,0,9.9l1.41,1.41L5.66,7.07,9.9,11.31,11.31,9.9,7.07,5.66Z"
        />
      </svg>
    )}
  </Rotate>
);
