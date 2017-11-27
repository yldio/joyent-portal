import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';

const ids = [rndId()];

export default ({ light = false, disabled = false, ...rest }) => (
  <Colors white secondary grey>
    {({ white, secondary, grey }) => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
      >
        <g transform="translate(17861 -18582)">
          <g id="icon: duplicate">
            <use
              fill={disabled ? grey : light ? white : secondary}
              xlinkHref={`#${ids[0]}`}
              transform="translate(-17861 18582)"
            />
          </g>
        </g>
        <defs>
          <path
            id={ids[0]}
            fillRule="evenodd"
            d="M 7 0L 5 0L 5 5L 0 5L 0 7L 5 7L 5 12L 7 12L 7 7L 12 7L 12 5L 7 5L 7 0Z"
          />
        </defs>
      </svg>
    )}
  </Colors>
);
