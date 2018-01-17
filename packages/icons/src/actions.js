import React from 'react';
import remcalc from 'remcalc';

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
        width="4"
        height="16"
        viewBox="0 0 4 16"
        xmlns="http://www.w3.org/2000/svg"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          fill-rule="evenodd"
          d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          style={{ transform: `translateY(${remcalc(6)})` }}
          fill-rule="evenodd"
          d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          style={{ transform: `translateY(${remcalc(12)})` }}
          fill-rule="evenodd"
          d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
      </svg>
    )}
  </Rotate>
);
