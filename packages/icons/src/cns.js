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
        width="16"
        height="13"
        viewBox="0 0 16 13"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-1106 442)">
          <use
            xlinkHref={`#${ids[0]}`}
            transform="translate(1106 -442)"
            fill={calcFill({ fill, disabled, light, colors })}
          />
          <use
            xlinkHref={`#${ids[1]}`}
            transform="translate(1106.6 -434)"
            fill={calcFill({ fill, disabled, light, colors })}
          />
          <use
            xlinkHref={`#${ids[2]}`}
            transform="translate(1112.1 -434)"
            fill={calcFill({ fill, disabled, light, colors })}
          />
          <use
            xlinkHref={`#${ids[1]}`}
            transform="translate(1117.6 -434)"
            fill={calcFill({ fill, disabled, light, colors })}
          />
        </g>
        <defs>
          <path
            id={ids[0]}
            d="M15 1v4H1V1h14zm0-1H1C.4 0 0 .4 0 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1z"
          />
          <path
            id={ids[1]}
            d="M3 2.4l-.6.7V0h-1v3.1l-.7-.7-.7.7L1.9 5l1.8-1.9-.7-.7z"
          />
          <path
            id={ids[2]}
            d="M3 2.4l-.6.7V0h-1v3.1l-.6-.7-.8.7L1.9 5l1.9-1.9-.8-.7z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
