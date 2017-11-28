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
            width="13"
            height="16"
            viewBox="0 0 13 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <path
              fill={calcFill({ fill, disabled, light, colors })}
              d="M 12 1L 10 1L 10 0L 3 0L 3 1L 1 1C 0.4 1 0 1.4 0 2L 0 15C 0 15.6 0.4 16 1 16L 12 16C 12.6 16 13 15.6 13 15L 13 2C 13 1.4 12.6 1 12 1ZM 4 1L 9 1L 9 2L 9 3L 4 3L 4 2L 4 1ZM 12 15L 1 15L 1 2L 3 2L 3 4L 10 4L 10 2L 12 2L 12 15Z"
            />
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
