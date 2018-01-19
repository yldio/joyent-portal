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
        width="20"
        height="15"
        viewBox="0 0 20 15"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M17,2a1,1,0,0,1,1,1v9a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H17M3,0A3,3,0,0,0,0,3v9a3,3,0,0,0,3,3H17q3,0,3-3V3q0-3-3-3ZM7.74,5A1.27,1.27,0,0,1,9,6.26V8.74A1.27,1.27,0,0,1,7.74,10H5.26A1.27,1.27,0,0,1,4,8.74V6.26A1.27,1.27,0,0,1,5.26,5H7.74M7.66,4H5.34A2.34,2.34,0,0,0,3,6.34V8.66A2.34,2.34,0,0,0,5.34,11H7.66A2.34,2.34,0,0,0,10,8.66V6.34A2.34,2.34,0,0,0,7.66,4ZM16,5H11V6h5Zm1,2H11V8h6ZM15,9H11v1h4Z"
        />
      </svg>
    )}
  </Rotate>
);
