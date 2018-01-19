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
        height="18.56"
        viewBox="0 0 17 18.56"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M15.88,1.75h-.07c-.34,0-.72,0-1.14,0-1.73,0-4-.27-5.39-1.49A1.16,1.16,0,0,0,7.72.3C6.35,1.52,4.06,1.79,2.33,1.79c-.42,0-.8,0-1.14,0H1.12A1.12,1.12,0,0,0,0,2.88v.94C0,10.5,3.4,16.29,8.5,18.56h0C13.6,16.29,17,11.64,17,5V2.88A1.12,1.12,0,0,0,15.88,1.75ZM15,5.46c0,5-2.3,8.87-6.5,10.9-4-2-6.5-6.6-6.5-11.9V3.63c.36,0,.72,0,1.07,0,2.43,0,4.26-.53,5.42-1.56l0,0,0,0c1.16,1,3,1.56,5.42,1.56.35,0,.71,0,1.06,0ZM5,4.69a10,10,0,0,1-1-.05V6.05a9,9,0,0,0,5,8.41H9v-11C8.23,4.51,6.27,4.69,5,4.69Zm3,8A8.36,8.36,0,0,1,5,6.05V5.69H5a9.3,9.3,0,0,0,3-.42Z"
        />
      </svg>
    )}
  </Rotate>
);
