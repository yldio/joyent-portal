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
        width="15"
        height="17"
        viewBox="0 0 15 17"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1886 1522)">
          <g>
            <g>
              <g>
                <use
                  xlinkHref={`#${ids[0]}`}
                  transform="translate(1886 -1522)"
                  fill={calcFill({ fill, disabled, light, colors })}
                />
              </g>
            </g>
            <g>
              <g>
                <use
                  xlinkHref={`#${ids[1]}`}
                  transform="translate(1889 -1519)"
                  fill={calcFill({ fill, disabled, light, colors })}
                />
              </g>
            </g>
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M 7.5 1.60001C 8.6 2.60001 10.5 3.20001 12.9 3.20001C 13.3 3.20001 13.6 3.20001 14 3.20001L 14 5C 14 10 11.7 13.9 7.5 15.9C 3.5 13.9 1 9.3 1 4L 1 3.20001C 1.3 3.20001 1.7 3.20001 2.1 3.20001C 4.5 3.20001 6.4 2.70001 7.5 1.60001ZM 7.5 0C 6.6 1.8 3.9 2.20001 2.1 2.20001C 0.899998 2.20001 0 2.10001 0 2.10001L 0 4C 0 9.9 3 15 7.5 17C 12 15 15 10.9 15 5L 15 2.10001C 15 2.10001 14.1 2.20001 12.9 2.20001C 11.1 2.20001 8.4 1.8 7.5 0Z"
          />
          <path
            id={ids[1]}
            d="M 4 2.05496L 4 9.06593C 2.1 7.73626 1 5.3187 1 2.65936L 1 2.41758C 2.2 2.41758 3.2 2.29672 4 2.05496ZM 5 0C 4.2 1.08791 2.3 1.20879 1 1.20879C 0.4 1.20879 0 1.20879 0 1.20879L 0 2.65936C 0 6.40661 2 9.67034 5 11L 5 0Z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
