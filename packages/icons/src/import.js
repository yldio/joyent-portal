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
        width="15"
        height="18"
        viewBox="0 0 15 18"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M0,11H2v5H13V11h2v7H0Zm7.7,2.8.4-.5L12,8.76l-.6-.7L8,12V0H7V12L3.6,8.06l-.6.7L7.5,14Z"
        />
      </svg>
    )}
  </Rotate>
);
