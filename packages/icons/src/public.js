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
        <g>
          <path
            fill={calcFill({ fill, disabled, light, colors })}
            d="M6 13a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm4-7V4a4 4 0 0 0-8 0h2c0-1.65.35-2 2-2s2 .35 2 2v2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"
          />
        </g>
      </svg>
    )}
  </Rotate>
);
