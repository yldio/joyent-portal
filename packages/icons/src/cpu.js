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
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M20,18a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H18a2,2,0,0,1,2,2Zm3-5a1,1,0,0,0,0-2H22V10h1a1,1,0,0,0,0-2H22V6a4,4,0,0,0-4-4H16V1a1,1,0,0,0-2,0V2H13V1a1,1,0,0,0-2,0V2H10V1A1,1,0,0,0,8,1V2H6A4,4,0,0,0,2,6V8H1a1,1,0,0,0,0,2H2v1H1a1,1,0,0,0,0,2H2v1H1a1,1,0,0,0,0,2H2v2a4,4,0,0,0,4,4H8v1a1,1,0,0,0,2,0V22h1v1a1,1,0,0,0,2,0V22h1v1a1,1,0,0,0,2,0V22h2a4,4,0,0,0,4-4V16h1a1,1,0,0,0,0-2H22V13ZM7,7V17H17V7Zm9,9H8V8h8Z"
        />
      </svg>
    )}
  </Rotate>
);
