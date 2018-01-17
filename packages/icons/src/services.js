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
        <g data-name="Layer 2">
          <path
            fill={calcFill({ fill, disabled, light, colors })}
            d="M6 5V4h5v1zm5 2V6H6v1zm0 2V8H6v1zm2-7H4v9h9V2m1-2a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2V1a1 1 0 0 1 1-1zm0 14H1V2H0v12a1 1 0 0 0 1 1h13z"
            data-name="Layer 1"
          />
        </g>
      </svg>
    )}
  </Rotate>
);
