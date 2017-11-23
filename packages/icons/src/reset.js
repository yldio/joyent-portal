import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';
import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId()];

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
            width="20"
            height="21"
            viewBox="0 0 20 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(17997 -18577)">
              <g>
                <use
                  xlinkHref={`#${ids[0]}`}
                  transform="matrix(0.866025 0.5 -0.5 0.866025 -17988.7 18577.9)"
                  fill={calcFill({ fill, disabled, light, colors })}
                />
              </g>
            </g>
            <defs>
              <path
                id={ids[0]}
                fillRule="evenodd"
                d="M 5.39661 3.57718L 5.3977 5.34469L 10.0255 2.67281L 5.39715 0L 5.39832 2.00201C 2.33086 2.5484 0.00065755 5.23112 0 8.45654C 0.000380483 12.0783 2.93556 15.0137 6.55562 15.0143C 10.1774 15.014 13.1128 12.0788 13.1124 8.45702L 11.5697 8.45687C 11.5697 11.2264 9.32527 13.4717 6.55578 13.4716C 3.78629 13.4716 1.54268 11.2262 1.5427 8.45669C 1.54135 6.08718 3.18616 4.10012 5.39661 3.57718Z"
              />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
