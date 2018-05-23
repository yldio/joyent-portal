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
        width="17.07"
        height="17.07"
        viewBox="0 0 17.07 17.07"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M14,9.07v5a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1v-10a1,1,0,0,1,1-1H8v-2H3c-2,0-3,1-3,3v10a2.65,2.65,0,0,0,3,3H13a2.65,2.65,0,0,0,3-3v-5ZM14.24,0,5.76,8.49,4.34,12.73l4.25-1.42,8.48-8.48ZM7.17,8.49l7.07-7.08,1.42,1.42L8.59,9.9Z"
        />
      </svg>
    )}
  </Rotate>
);
