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
        width="12.46"
        height="14.46"
        viewBox="0 0 12.46 14.46"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M8,3.1,7.11,4.63h5.35L9.78,0l-1,1.73a6.56,6.56,0,1,0,3.46,9.45l-1.34-.77A5,5,0,1,1,8,3.1Z"
        />
      </svg>
    )}
  </Rotate>
);
