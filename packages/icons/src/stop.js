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
        width="14"
        height="14"
        viewBox="0 0 14 14"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M10.75,1.75a1.5,1.5,0,0,1,1.5,1.5v7.5a1.5,1.5,0,0,1-1.5,1.5H3.25a1.5,1.5,0,0,1-1.5-1.5V3.25a1.5,1.5,0,0,1,1.5-1.5h7.5m0-1.75H3.25A3.26,3.26,0,0,0,0,3.25v7.5A3.26,3.26,0,0,0,3.25,14h7.5A3.26,3.26,0,0,0,14,10.75V3.25A3.26,3.26,0,0,0,10.75,0Z"
        />
      </svg>
    )}
  </Rotate>
);
