import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';

const ids = [rndId(), rndId()];

export default ({ light = false, disabled = false, ...rest }) => (
  <Colors white secondary grey>
    {({ white, secondary, grey }) => (
      <svg
        width="13"
        height="16"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
      >
        <g transform="translate(-2367 443)">
          <use
            xlinkHref={`#${ids[0]}`}
            transform="translate(2370 -437)"
            fill={disabled ? grey : light ? white : secondary}
          />
          <use
            xlinkHref={`#${ids[1]}`}
            transform="translate(2367 -443)"
            fill={disabled ? grey : light ? white : secondary}
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
  </Colors>
);
