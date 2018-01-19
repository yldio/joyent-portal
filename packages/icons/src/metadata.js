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
        width="17.04"
        height="11"
        viewBox="0 0 17.04 11"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M5.41,9,.24,5.93a.51.51,0,0,1,0-.86L5.41,2V3.45a.5.5,0,0,1-.25.44L2.39,5.5,5.17,7.19a.5.5,0,0,1,.24.43Z"
        />
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M11.63,9l5.16-3.07a.5.5,0,0,0,0-.86L11.63,2V3.45a.52.52,0,0,0,.25.44L14.65,5.5,11.87,7.19a.5.5,0,0,0-.24.43Z"
        />
        <polygon points="7.52 11 6.52 11 9.52 0 10.52 0 7.52 11" />
      </svg>
    )}
  </Rotate>
);
