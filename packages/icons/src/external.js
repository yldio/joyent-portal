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
        width="17"
        height="17"
        viewBox="0 0 17 17"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M14,9v5a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3H8V1H3C1,1,0,2,0,4V14c0,2,1,3,3,3H13c2,0,3-1,3-3V9ZM11,0h6V6H15V2.7L7.38,10.32l-.7-.7L14.29,2H11Z"
        />
      </svg>
    )}
  </Rotate>
);
