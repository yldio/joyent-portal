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
        width="21.48"
        height="21.91"
        viewBox="0 0 21.48 21.91"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M20.91,12.51a.76.76,0,0,0-1.17-.16l-.91.77.42-2.19c.12-.59-.51-1.24-1.1-.85L13.83,13c.11-.71.22-1.42.32-2.13a.75.75,0,0,0-1.37-.58l-4.31,6.4Q9.88,12,11.28,7.36c.51-1.69,2.81-6.23.05-7.23C8.87-.76,6.15,3.21,4.93,4.8A29.09,29.09,0,0,0,0,14.9a.75.75,0,0,0,1.45.4A28,28,0,0,1,4.65,7.85,28.22,28.22,0,0,1,7.11,4.48C7.7,3.8,11,.1,11,3.23a23.53,23.53,0,0,1-1.28,4.2c-.42,1.41-.85,2.81-1.27,4.21Q7,16.32,5.59,21A.75.75,0,0,0,7,21.57l5.24-7.78-.08.52c-.09.59.5,1.25,1.1.85l4.24-2.82c-.17.84-.33,1.68-.49,2.52a.76.76,0,0,0,1.25.73l1.72-1.45a2.59,2.59,0,0,1-.21,1.75c-.33.91,1.12,1.3,1.45.4A4.4,4.4,0,0,0,20.91,12.51Z"
        />
      </svg>
    )}
  </Rotate>
);
