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
        width="19"
        height="19"
        viewBox="0 0 19 19"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M18.61,9.3,9.69.39A1.29,1.29,0,0,0,8.76,0H1.32A1.33,1.33,0,0,0,0,1.33V8.76a1.33,1.33,0,0,0,.39.94L9.3,18.61a1.33,1.33,0,0,0,.94.39,1.3,1.3,0,0,0,.93-.39l7.44-7.44A1.32,1.32,0,0,0,18.61,9.3Zm-1.68,1-6.65,6.65a.17.17,0,0,1-.12.05.14.14,0,0,1-.11-.05l-8-8a.18.18,0,0,1,0-.12V2.19A.17.17,0,0,1,2.18,2H8.84a.16.16,0,0,1,.11,0l8,8a.15.15,0,0,1,.05.11A.17.17,0,0,1,16.93,10.28ZM6.61,4.06A2.55,2.55,0,1,0,9.16,6.61,2.55,2.55,0,0,0,6.61,4.06Zm0,4.08A1.53,1.53,0,1,1,8.14,6.61,1.54,1.54,0,0,1,6.61,8.14Z"
        />
      </svg>
    )}
  </Rotate>
);
