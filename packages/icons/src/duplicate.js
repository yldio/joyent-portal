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
            width="12"
            height="12"
            viewBox="0 0 12 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(17861 -18582)">
              <g>
                <use
                  fill={calcFill({ fill, disabled, light, colors })}
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
      </Rotate>
    )}
  </Colors>
);
