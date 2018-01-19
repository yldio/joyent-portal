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
        width="18"
        height="19"
        viewBox="0 0 18 19"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M16,2V17H5V12H3v5a2.16,2.16,0,0,0,2,2H16a2.15,2.15,0,0,0,2-2V2a2.15,2.15,0,0,0-2-2H5A2.05,2.05,0,0,0,3,2V7L5,7V2m8.74,7.32-.51-.44L8.77,5l-.71.61L12,9H0v1H12L8.06,13.38l.71.62L14,9.5Z"
        />
      </svg>
    )}
  </Rotate>
);
