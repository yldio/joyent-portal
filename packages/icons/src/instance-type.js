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
        width="15"
        height="18"
        viewBox="0 0 15 18"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1106 1522)">
          <g>
            <g>
              <use
                xlinkHref={`#${ids[0]}`}
                transform="translate(1108 -1516)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <g>
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(1110 -1514)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <g>
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(1112 -1514)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <g>
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(1114 -1514)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <g>
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(1116 -1514)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <g>
              <use
                xlinkHref={`#${ids[2]}`}
                transform="translate(1106 -1522)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M 10 1L 10 7L 1 7L 1 1L 10 1ZM 10 0L 1 0C 0.5 0 0 0.4 0 1L 0 7C 0 7.5 0.4 8 1 8L 10 8C 10.5 8 11 7.6 11 7L 11 1C 11 0.4 10.6 0 10 0Z"
          />
          <path
            id={ids[1]}
            d="M 0.5 4C 0.2 4 0 3.8 0 3.5L 0 0.5C 0 0.2 0.2 0 0.5 0C 0.8 0 1 0.2 1 0.5L 1 3.5C 1 3.8 0.8 4 0.5 4Z"
          />
          <path
            id={ids[2]}
            d="M 14 4L 11 1L 10 0L 1 0C 0.5 0 0 0.4 0 1L 0 17C 0 17.5 0.4 18 1 18L 14 18C 14.5 18 15 17.6 15 17L 15 5L 14 4ZM 12.6 4L 11 4L 11 2.4L 12.6 4ZM 1 17L 1 1L 10 1L 10 5L 14 5L 14 17L 1 17Z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
