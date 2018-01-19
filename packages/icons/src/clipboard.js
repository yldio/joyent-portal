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
        width="15"
        height="19"
        viewBox="0 0 15 19"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M5,12l2-2v9H8V10l2,2,1-1L7.5,8,4,11ZM11,1h2a2.15,2.15,0,0,1,2,2V16a2.15,2.15,0,0,1-2,2H10V16h3V3H11V5H4V3H2V16H5v2H2a2.15,2.15,0,0,1-2-2V3A2.15,2.15,0,0,1,2,1H4V0h7ZM9,2H6V3H9V2Z"
        />
      </svg>
    )}
  </Rotate>
);
