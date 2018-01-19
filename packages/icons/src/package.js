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
        height="20.12"
        viewBox="0 0 19 20.12"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M14.45,2.79h0L9.5,0,0,5.36v9.39l9.5,5.37L19,14.75V5.36ZM16,5.86,9.5,9.51,6.44,7.79l6.47-3.66Zm-4.08-2.3L5.43,7.21h0L3,5.86,9.5,2.21ZM2,6.44H2L5,8.12v1.94l1,1V8.68l3,1.7v7.25L2,13.68Zm15,0v7.24l-7,3.95V10.38l7-4Z"
        />
      </svg>
    )}
  </Rotate>
);
