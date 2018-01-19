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
        width="15.43"
        height="18"
        viewBox="0 0 15.43 18"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M15.09,13.64,12.29,6h.14a3,3,0,0,0,0-6H3A3,3,0,0,0,0,3a3.37,3.37,0,0,0,.09.71,6.85,6.85,0,0,0,.25.64l3,7.68L3,12a3,3,0,0,0,0,6h9.43a2.94,2.94,0,0,0,3-3.43A7.54,7.54,0,0,0,15.09,13.64ZM12.43,1.46a1.54,1.54,0,1,1,0,3.08,1.52,1.52,0,0,1-1.27-.67l-.24-.6a1.24,1.24,0,0,1,0-.27A1.54,1.54,0,0,1,12.43,1.46ZM2,3.74l-.21-.52a.78.78,0,0,1,0-.22A1.29,1.29,0,0,1,3,1.71H9.73A3,3,0,0,0,9.43,3a2.76,2.76,0,0,0,.09.71L9.63,4c0,.09.77,2,.77,2l2.33,6-.3,0H5.36L2.88,6ZM9.73,16.29H3a1.29,1.29,0,0,1,0-2.58H9.73a2.92,2.92,0,0,0,0,2.58Zm2.7.25A1.54,1.54,0,1,1,14,15,1.54,1.54,0,0,1,12.43,16.54Z"
        />
      </svg>
    )}
  </Rotate>
);
