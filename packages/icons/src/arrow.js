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
        width="9"
        height="6"
        viewBox="0 0 9 6"
        xmlns="http://www.w3.org/2000/svg"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          fillRule="evenodd"
          d="M9 1.386L7.648 0 4.5 3.228 1.352 0 0 1.386 4.5 6z"
        />
      </svg>
    )}
  </Rotate>
);
