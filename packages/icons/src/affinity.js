import React from 'react';
import rndId from 'rnd-id';

import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId(), rndId(), rndId()];

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
        width="18"
        height="12"
        viewBox="0 0 18 12"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1104 1236)">
          <g>
            <g>
              <use
                fill={calcFill({ fill, disabled, light, colors })}
                xlinkHref={`#${ids[0]}`}
                transform="translate(1104 -1236)"
              />
            </g>
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M 12 0C 10.9 0 9.9 0.300003 9 0.800003C 8.1 0.300003 7.1 0 6 0C 2.7 0 0 2.7 0 6C 0 9.3 2.7 12 6 12C 7.1 12 8.1 11.7 9 11.2C 9.9 11.7 10.9 12 12 12C 15.3 12 18 9.3 18 6C 18 2.7 15.3 0 12 0ZM 6 11C 3.2 11 1 8.8 1 6C 1 3.2 3.2 1 6 1C 6.7 1 7.4 1.2 8.1 1.5C 6.8 2.6 6 4.2 6 6C 6 7.8 6.8 9.4 8.1 10.5C 7.4 10.8 6.7 11 6 11ZM 11 6C 11 7.6 10.2 9.1 9 10C 7.8 9.1 7 7.7 7 6C 7 4.3 7.8 2.9 9 2C 10.2 2.9 11 4.4 11 6ZM 12 11C 11.3 11 10.6 10.8 9.9 10.5C 11.2 9.4 12 7.8 12 6C 12 4.2 11.2 2.6 9.9 1.5C 10.5 1.2 11.2 1 12 1C 14.8 1 17 3.2 17 6C 17 8.8 14.8 11 12 11Z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
