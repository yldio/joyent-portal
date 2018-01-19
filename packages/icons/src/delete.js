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
        width="12"
        height="16"
        viewBox="0 0 12 16"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M2.67,0V1.5H0V3H12V1.5H9.33V0ZM0,4,1.33,16h9.34L12,4ZM8,5h2.51l-1,10H8ZM1.49,5H4V15H2.53ZM7,15H5V5H7Z"
        />
      </svg>
    )}
  </Rotate>
);
