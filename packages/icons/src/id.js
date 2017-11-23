import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';
import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId(), rndId(), rndId(), rndId(), rndId()];

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
            width="18"
            height="12"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(-2124 441)">
              <use
                xlinkHref={`#${ids[0]}`}
                transform="translate(2124 -441)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(2126 -439)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
              <use
                xlinkHref={`#${ids[2]}`}
                transform="translate(2134 -438)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
              <use
                xlinkHref={`#${ids[3]}`}
                transform="translate(2134 -436)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
              <use
                xlinkHref={`#${ids[4]}`}
                transform="translate(2134 -434)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <defs>
              <path
                id={ids[0]}
                d="M16 1c.6 0 1 .5 1 1v8c0 .6-.5 1-1 1H2c-.6 0-1-.5-1-1V2c0-.6.5-1 1-1h14zm0-1H2C.9 0 0 .9 0 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
              />
              <path
                id={ids[1]}
                d="M4.7 1C5.4 1 6 1.6 6 2.3v2.5c0 .7-.6 1.3-1.3 1.3H2.3C1.6 6.1 1 5.5 1 4.8V2.3C1 1.6 1.6 1 2.3 1h2.4zm0-1H2.3C1 0 0 1 0 2.3v2.3c0 1.3 1 2.3 2.3 2.3h2.3C6 7 7 5.9 7 4.6V2.3C7 1 6 0 4.7 0z"
              />
              <path id={ids[2]} d="M5 0H0v1h5V0z" />
              <path id={ids[3]} d="M6 0H0v1h6V0z" />
              <path id={ids[4]} d="M4 0H0v1h4V0z" />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
