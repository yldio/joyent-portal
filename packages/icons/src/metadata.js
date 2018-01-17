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
        height="11"
        viewBox="0 0 18 11"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1884 1236)">
          <g>
            <g>
              <g>
                <use
                  xlinkHref={`#${ids[0]}`}
                  transform="translate(1884 -1233.9)"
                  fill={calcFill({ fill, disabled, light, colors })}
                />
              </g>
            </g>
            <g>
              <g>
                <use
                  xlinkHref={`#${ids[1]}`}
                  transform="translate(1896 -1233.9)"
                  fill={calcFill({ fill, disabled, light, colors })}
                />
              </g>
            </g>
            <g>
              <use
                xlinkHref={`#${ids[2]}`}
                transform="translate(1891 -1236)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M 5.5 6.79999L 0 3.4L 5.5 6.10352e-06L 6 0.799994L 1.9 3.4L 6 6.00001L 5.5 6.79999Z"
          />
          <path
            id={ids[1]}
            d="M 0.5 6.79999L 0 6.00001L 4.1 3.4L 0 0.799994L 0.5 6.10352e-06L 6 3.4L 0.5 6.79999Z"
          />
          <path id={ids[2]} d="M 1 11L 0 11L 3 0L 4 0L 1 11Z" />
        </defs>
      </svg>
    )}
  </Rotate>
);
