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
        viewBox="0 0 12 16"
        width="12"
        height="16"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M6,13H6a1,1,0,0,1-1-1V10A1,1,0,0,1,6,9H6a1,1,0,0,1,1,1v2A1,1,0,0,1,6,13Zm4-7V4A4,4,0,0,0,2,4H4c0-1.65.35-2,2-2s2,.35,2,2V6H2A2,2,0,0,0,0,8v6a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V8A2,2,0,0,0,10,6Zm0,7a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V9A1,1,0,0,1,3,8H9a1,1,0,0,1,1,1Z"
        />
      </svg>
    )}
  </Rotate>
);
