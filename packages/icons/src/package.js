import React from 'react';
import rndId from 'rnd-id';

import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId()];

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
        width="17"
        height="18"
        viewBox="0 0 17 18"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1885 710)">
          <g>
            <use
              xlinkHref={`#${ids[0]}`}
              transform="translate(1885 -710)"
              fill={calcFill({ fill, disabled, light, colors })}
            />
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M 12.9 2.5L 8.5 0L 0 4.79999L 0 13.2L 8.5 18L 17 13.2L 17 4.79999L 12.9 2.5ZM 15 4.79999L 8.5 8.5L 5.4 6.79999L 11.9 3.10001L 15 4.79999ZM 10.9 2.5L 4.4 6.10001L 2 4.79999L 8.5 1.10001L 10.9 2.5ZM 1 5.39999L 4 7.10001L 4 9L 5 10L 5 7.60001L 8 9.29999L 8 16.6L 1 12.6L 1 5.39999ZM 16 5.39999L 16 12.6L 9 16.6L 9 9.29999L 16 5.39999Z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
