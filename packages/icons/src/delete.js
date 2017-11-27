import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';

const ids = [rndId()];

export default ({ red = false, light = false, disabled = false, ...rest }) => (
  <Colors white secondary grey red={red}>
    {({ white, secondary, grey, red }) => (
      <svg
        width="9"
        height="12"
        viewBox="0 0 9 12"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
      >
        <g transform="translate(17403 -18583)">
          <g>
            <use
              fill={red ? red : disabled ? grey : light ? white : secondary}
              xlinkHref={`#${ids[0]}`}
              transform="translate(-17403 18583)"
            />
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            fillRule="evenodd"
            d="M 2 0L 2 1L 0 1L 0 2L 9 2L 9 1L 7 1L 7 0L 2 0ZM 0 3L 1 12L 8 12L 9 3L 0 3ZM 6 4L 7.882 4L 7.104 11L 6 11L 6 4ZM 4 11L 5.001 11L 5.001 4L 4 4L 4 11ZM 1.11719 4L 3.00019 4L 3.00019 11L 1.89619 11L 1.11719 4Z"
          />
        </defs>
      </svg>
    )}
  </Colors>
);
