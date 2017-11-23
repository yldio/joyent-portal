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
            width="9"
            height="13"
            viewBox="0 0 9 13"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <path
              fill={calcFill({ fill, disabled, light, colors })}
              fillRule="evenodd"
              d="M0 13h9V0H0v13zm2-2h5V2H2v9zm1-7h3.001V3H3v1zm0 2h3.001V5H3v1zm0 2h3.001V7H3v1z"
            />
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
