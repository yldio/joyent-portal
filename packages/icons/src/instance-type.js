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
        width="16.67"
        height="20"
        viewBox="0 0 16.67 20"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M12.83,8v6h-9V8h9m0-1h-9a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h9a1,1,0,0,0,1-1V8a1,1,0,0,0-1-1Zm-7,5.5v-3a.5.5,0,0,0-.5-.5h0a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h0A.5.5,0,0,0,5.83,12.5Zm2,0v-3a.5.5,0,0,0-.5-.5h0a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h0A.5.5,0,0,0,7.83,12.5Zm2,0v-3a.5.5,0,0,0-.5-.5h0a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h0A.5.5,0,0,0,9.83,12.5Zm2,0v-3a.5.5,0,0,0-.5-.5h0a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h0A.5.5,0,0,0,11.83,12.5Zm3.73-8.06L12.22,1.11,11.11,0h-10A1.11,1.11,0,0,0,0,1.11V18.89A1.11,1.11,0,0,0,1.11,20H15.56a1.11,1.11,0,0,0,1.11-1.11V5.56ZM14.83,5h-3V2Zm-13,13V2h9V6h4V18Z"
        />
      </svg>
    )}
  </Rotate>
);
