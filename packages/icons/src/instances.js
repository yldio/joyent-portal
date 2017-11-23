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
            width="18"
            height="9"
            viewBox="0 0 18 9"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <path
              fill={calcFill({ fill, disabled, light, colors })}
              fillRule="evenodd"
              d="M4.5 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m8.59 0c-.375 0-.739.047-1.09.12 2.184.456 3.818 2.239 3.818 4.38S14.184 8.424 12 8.88c.351.073.715.12 1.09.12C15.803 9 18 6.985 18 4.5S15.802 0 13.09 0M14 4.5C14 6.985 11.802 9 9.09 9c-.375 0-.739-.047-1.09-.12 2.184-.456 3.818-2.239 3.818-4.38S10.184.576 8 .12C8.351.047 8.715 0 9.09 0 11.803 0 14 2.015 14 4.5"
            />
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
