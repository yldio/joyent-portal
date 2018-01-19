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
        height="15.71"
        viewBox="0 0 18 15.71"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M15.28,2a.81.81,0,0,1,.72.86.91.91,0,0,1-.25.65l0,0,0,0L11.54,8.35A4.11,4.11,0,0,0,10,12.17v.88c0,.43,0,.66-1,.66s-1-.23-1-.66v-.88A4.11,4.11,0,0,0,6.46,8.35L2.3,3.58l0,0,0,0A.91.91,0,0,1,2,2.86.81.81,0,0,1,2.72,2H15.28m0-2H2.72A2.8,2.8,0,0,0,0,2.86a2.9,2.9,0,0,0,.8,2L5,9.71c1,1,1,1,1,2.46v.88c0,1.66,1,2.66,3,2.66s3-1,3-2.66v-.88c0-1.46,0-1.46,1-2.46l4.2-4.82a2.9,2.9,0,0,0,.8-2A2.8,2.8,0,0,0,15.28,0Z"
        />
      </svg>
    )}
  </Rotate>
);
