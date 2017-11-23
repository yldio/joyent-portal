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
            width="13"
            height="16"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(-2367 443)">
              <use
                xlinkHref={`#${ids[0]}`}
                transform="translate(2370 -437)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
              <use
                xlinkHref={`#${ids[1]}`}
                transform="translate(2367 -443)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
            <defs>
              <path id={ids[0]} d="M6 3L4 5V0H3v5L1 3 0 4l3.5 3L7 4 6 3z" />
              <path
                id={ids[1]}
                d="M12 1h-2V0H3v1H1c-.6 0-1 .4-1 1v13c0 .6.4 1 1 1h11c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zM4 1h5v2H4V1zm8 14H1V2h2v2h7V2h2v13z"
              />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
