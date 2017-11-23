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
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <path
              fill={calcFill({ fill, disabled, light, colors })}
              d="M7.314 5.9l4.242-4.243L10.142.243 5.9 4.485 1.657.243.243 1.657l4.242 4.242-4.242 4.243 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L7.314 5.9z"
              fillRule="evenodd"
            />
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
