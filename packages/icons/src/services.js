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
        width="15"
        height="15"
        viewBox="0 0 15 15"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M6,5V4h5V5Zm5,2V6H6V7Zm0,2V8H6V9Zm2-7H4v9h9V2m1-2a1,1,0,0,1,1,1V12a1,1,0,0,1-1,1H2V1A1,1,0,0,1,3,0Zm0,14H1V2H0V14a1,1,0,0,0,1,1H14Z"
        />
      </svg>
    )}
  </Rotate>
);
