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
        width="8"
        height="8"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M3 3H0v2h3v3h2V5h3V3H5V0H3v3z"
          fillRule="evenodd"
        />
      </svg>
    )}
  </Rotate>
);
