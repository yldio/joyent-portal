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
            width="17"
            height="17"
            viewBox="0 0 17 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(-1885 974)">
              <g>
                <g>
                  <g>
                    <use
                      xlinkHref={`#${ids[0]}`}
                      transform="translate(1885 -974)"
                      fill={calcFill({ fill, disabled, light, colors })}
                    />
                  </g>
                </g>
                <g>
                  <use
                    xlinkHref={`#${ids[1]}`}
                    transform="translate(1888 -971)"
                    fill={calcFill({ fill, disabled, light, colors })}
                  />
                </g>
              </g>
            </g>
            <defs>
              <path
                id={ids[0]}
                d="M 7.7 1L 7.8 1L 15.6 8.79999L 15.6 8.89999L 15.6 9L 9.1 15.5L 9 15.5L 8.9 15.5L 1.1 7.70001L 1.1 7.60001L 1.1 1.10001C 1.1 1.00001 1.2 0.899994 1.3 0.899994L 7.7 1ZM 7.7 0L 1.2 0C 0.599997 0 0 0.500012 0 1.20001L 0 7.70001C 0 8.00001 0.100003 8.3 0.300003 8.5L 8.1 16.3C 8.3 16.5 8.6 16.6 8.9 16.6C 9.2 16.6 9.5 16.5 9.7 16.3L 16.2 9.79999C 16.7 9.29999 16.7 8.60001 16.2 8.20001L 8.4 0.399994C 8.3 0.0999939 8 0 7.7 0Z"
              />
              <path
                id={ids[1]}
                d="M 2.5 1C 3.3 1 4 1.7 4 2.5C 4 3.3 3.3 4 2.5 4C 1.7 4 1 3.3 1 2.5C 1 1.7 1.7 1 2.5 1ZM 2.5 0C 1.1 0 0 1.1 0 2.5C 0 3.9 1.1 5 2.5 5C 3.9 5 5 3.9 5 2.5C 5 1.1 3.9 0 2.5 0Z"
              />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
