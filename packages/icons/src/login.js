import React from 'react';
import rndId from 'rnd-id';

import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId(), rndId()];

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
        height="17"
        viewBox="0 0 17 17"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1885 179)">
          <g>
            <g>
              <use
                xlinkHref={`#${ids[0]}`}
                transform="translate(1889 -179)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <g>
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(1885 -175)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M 12 1.00001L 12 16L 1 16L 1 11L 0 11L 0 16C 0 16.6 0.4 17 1 17L 12 17C 12.6 17 13 16.6 13 16L 13 1.00001C 13 0.400006 12.6 6.10352e-06 12 6.10352e-06L 1 6.10352e-06C 0.4 6.10352e-06 0 0.400006 0 1.00001L 0 6.00001L 1 6.00001L 1 1.00001L 12 1.00001Z"
          />
          <path
            id={ids[1]}
            d="M 13.7 4.29999L 13.2 3.9L 8.7 6.10352e-06L 8 0.599997L 11.9 4.00001L 0 4.00001L 0 5.00001L 11.9 5.00001L 8 8.4L 8.7 9.00001L 13.9 4.50001L 13.7 4.29999Z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
