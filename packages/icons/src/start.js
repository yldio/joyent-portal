import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';
import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId(), rndId(), rndId()];

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
            width="15"
            height="15"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(18292 -19563)">
              <mask id={ids[0]}>
                <rect
                  fill="#fff"
                  x={-1}
                  y={-1}
                  width={15}
                  height={15}
                  transform="matrix(6.12323e-17 1 -1 6.12323e-17 -18278 19564)"
                />
                <use
                  xlinkHref={`#${ids[1]}`}
                  fill="#000"
                  transform="matrix(6.12323e-17 1 -1 6.12323e-17 -18278 19564)"
                />
              </mask>
              <g mask={`url(#${ids[0]}`}>
                <use
                  xlinkHref={`#${ids[2]}`}
                  transform="matrix(6.12323e-17 1 -1 6.12323e-17 -18278 19564)"
                  fill={calcFill({ fill, disabled, light, colors })}
                />
              </g>
            </g>
            <defs>
              <path
                id={ids[1]}
                d="M5.595 1.93a1 1 0 0 1 1.81 0l4.056 8.645A1 1 0 0 1 10.556 12H2.444a1 1 0 0 1-.905-1.425L5.595 1.93z"
              />
              <path
                id={ids[2]}
                d="M1.54 10.575l-1.812-.85 1.811.85zM7.404 1.93l-1.81.85 1.81-.85zm-1.81.85l4.055 8.645 3.621-1.7-4.055-8.644-3.621 1.698zm4.96 7.22h-8.11v4h8.11v-4zM3.35 11.425l4.055-8.646-3.621-1.698-4.056 8.645 3.622 1.699zM2.444 10a1 1 0 0 1 .906 1.425l-3.622-1.7C-1.205 11.716.247 14 2.444 14v-4zm7.206 1.425A1 1 0 0 1 10.555 10v4c2.198 0 3.65-2.285 2.716-4.274l-3.62 1.699zM9.216 1.08c-1.08-2.302-4.353-2.302-5.432 0l3.621 1.698a1 1 0 0 1-1.81 0l3.621-1.698z"
              />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
