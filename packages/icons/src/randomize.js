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
        viewBox="0 0 18.22 18.22"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="18.22"
        height="18.22"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          d="M6.32,1l4.55,5.31L5.56,10.87,1,5.56,6.32,1m0-1a1,1,0,0,0-.65.24L.35,4.8A1,1,0,0,0,.24,6.21L4.8,11.52a1,1,0,0,0,1.41.11l5.31-4.56a1,1,0,0,0,.11-1.4L7.07.35A1,1,0,0,0,6.32,0Zm4.14,8.65,6.76,1.81-1.8,6.76-6.77-1.8,1.81-6.77m0-1a1,1,0,0,0-1,.74l-1.8,6.77a1,1,0,0,0,.7,1.22l6.77,1.81a1.09,1.09,0,0,0,.26,0,1,1,0,0,0,1-.74l1.81-6.77a1,1,0,0,0-.71-1.22l-6.77-1.8a.73.73,0,0,0-.25,0ZM6.86,3.17a1,1,0,1,0-.11,1.41A1,1,0,0,0,6.86,3.17Zm2,2.28A1,1,0,1,0,8.7,6.86,1,1,0,0,0,8.81,5.45Zm-2.28,2a1,1,0,1,0-.11,1.41A1,1,0,0,0,6.53,7.4ZM4.58,5.12a1,1,0,1,0-.11,1.41A1,1,0,0,0,4.58,5.12Zm6.33,5.72a1,1,0,1,0,1.22-.71A1,1,0,0,0,10.91,10.84ZM13,14.51A1,1,0,1,0,15,15,1,1,0,0,0,13,14.51Z"
          fill={calcFill({ fill, disabled, light, colors })}
        />
      </svg>
    )}
  </Rotate>
);
