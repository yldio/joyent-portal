import React from 'react';

import Colors from './colors';
import Rotate from './rotate';
import calcFill from './fill';

export default ({
  fill = null,
  light = false,
  disabled = false,
  direction = 'down',
  style = {},
  ...rest
}) => (
  <Colors white text grey>
    {colors => (
      <Rotate direction={direction}>
        {({ style: rotateStyle }) => (
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <path
              fill={calcFill({ fill, disabled, light, colors })}
              fillRule="evenodd"
              d="M1.12 0L0 1.36 3.496 4.8 0 8.24 1.12 9.6 6 4.8 1.12 0z"
              opacity=".5"
            />
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
