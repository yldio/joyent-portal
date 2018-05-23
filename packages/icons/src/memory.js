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
        width="21.68"
        height="21.68"
        viewBox="0 0 21.68 21.68"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M6.24,11.9,8.36,14l1.42-1.41L7.66,10.49ZM4.12,14l2.12,2.12,1.42-1.41L5.54,12.6ZM8.36,9.78l2.13,2.12,1.41-1.41L9.78,8.36Zm2.13-2.12,2.12,2.12L14,8.36,11.9,6.24Zm2.12-2.13,2.12,2.13,1.41-1.42L14,4.12Zm8.48,0L16.14.59a2,2,0,0,0-2.83,0L.59,13.31a2,2,0,0,0,0,2.83l5,4.95a2,2,0,0,0,2.82,0l1.42-1.41.71.7A1,1,0,0,0,11.9,19l-.71-.71.71-.7.71.7A1,1,0,0,0,14,16.85l-.71-.71.71-.71.71.71a1,1,0,0,0,1.41-1.41L15.43,14l.71-.71.71.71a1,1,0,0,0,1.41-1.41l-.7-.71.7-.71.71.71a1,1,0,0,0,1.41-1.41l-.7-.71,1.41-1.42A2,2,0,0,0,21.09,5.54ZM7,19.68,2,14.73,14.73,2l4.95,5Z"
        />
      </svg>
    )}
  </Rotate>
);
