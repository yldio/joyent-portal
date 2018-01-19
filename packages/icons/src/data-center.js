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
        width="9"
        height="13"
        viewBox="0 0 9 13"
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M0,0V13H9V0ZM7,11H2V2H7ZM3,4H6V3H3ZM3,6H6V5H3ZM3,8H6V7H3Z"
        />
      </svg>
    )}
  </Rotate>
);
