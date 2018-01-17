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
        width="14"
        height="14"
        viewBox="0 0 14 14"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(18113 -18582)">
          <g>
            <mask id={ids[0]}>
              <use
                xlinkHref={`#${ids[1]}`}
                fill="white"
                transform="translate(-18113 18582)"
              />
            </mask>
            <g mask={`url(#${ids[0]})`}>
              <use
                xlinkHref={`#${ids[2]}`}
                transform="translate(-18113 18582)"
                fill={calcFill({ fill, disabled, light, colors })}
              />
            </g>
          </g>
        </g>
        <defs>
          <path
            id={ids[1]}
            d="M 0 2C 0 0.895431 0.895431 0 2 0L 12 0C 13.1046 0 14 0.895431 14 2L 14 12C 14 13.1046 13.1046 14 12 14L 2 14C 0.895431 14 0 13.1046 0 12L 0 2Z"
          />
          <path
            id={ids[2]}
            d="M 2 2L 12 2L 12 -2L 2 -2L 2 2ZM 12 2L 12 12L 16 12L 16 2L 12 2ZM 12 12L 2 12L 2 16L 12 16L 12 12ZM 2 12L 2 2L -2 2L -2 12L 2 12ZM 2 12L 2 12L -2 12C -2 14.2091 -0.209139 16 2 16L 2 12ZM 12 12L 12 12L 12 16C 14.2091 16 16 14.2091 16 12L 12 12ZM 12 2L 12 2L 16 2C 16 -0.209139 14.2091 -2 12 -2L 12 2ZM 2 -2C -0.209139 -2 -2 -0.209139 -2 2L 2 2L 2 2L 2 -2Z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
