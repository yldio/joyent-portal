import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';
import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId(), rndId()];

export default ({
  fill = null,
  light = false,
  disabled = false,
  direction = 'down',
  style = {},
  ...rest
}) => (
  <Colors white text grey>
    {colors => (
      <Rotate direction={direction}>
        {({ style: rotateStyle }) => (
          <svg
            width="17"
            height="17"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(-1886 444)">
              <use
                xlinkHref={`#${ids[0]}`}
                transform="translate(1886 -441.9)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(1889.4 -444)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <defs>
              <path
                id={ids[0]}
                d="M13 7v5c0 .5-.4 1-1 1H2c-.5 0-1-.4-1-1V2c0-.5.4-1 1-1h5V0H2C.9 0 0 .9 0 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7h-1z"
              />
              <path
                id={ids[1]}
                d="M9.8 0L1.4 8.5 0 12.7l4.2-1.4 8.5-8.5L9.8 0zm-7 8.5l7.1-7.1 1.4 1.4-7.1 7.1-1.4-1.4z"
              />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
