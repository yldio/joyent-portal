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
        width="22"
        height="22"
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M17,16a1,1,0,1,1,1,1A1,1,0,0,1,17,16ZM7,17H8V15H7ZM5,17H6V15H5ZM3,17H4V15H3Zm14-7a1,1,0,1,1,1,1A1,1,0,0,1,17,10ZM7,11H8V9H7ZM5,11H6V9H5ZM3,11H4V9H3ZM19,4a1,1,0,1,1-1-1A1,1,0,0,1,19,4ZM7,5H8V3H7ZM5,5H6V3H5ZM3,5H4V3H3ZM22,2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V6A1.91,1.91,0,0,0,.28,7,1.88,1.88,0,0,0,0,8v4a1.91,1.91,0,0,0,.28,1A1.88,1.88,0,0,0,0,14v4a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V14a1.88,1.88,0,0,0-.28-1A1.91,1.91,0,0,0,22,12V8a1.88,1.88,0,0,0-.28-1A1.91,1.91,0,0,0,22,6ZM20,18H2V14H20Zm0-6H2V8H20Zm0-6H2V2H20Z"
        />
      </svg>
    )}
  </Rotate>
);
