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
            width="17"
            height="17"
            viewBox="0 0 17 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(-1105 974)">
              <g>
                <g>
                  <use
                    xlinkHref={`#${ids[0]}`}
                    transform="translate(1105 -974)"
                    fill={calcFill({ fill, disabled, light, colors })}
                  />
                </g>
                <g>
                  <use
                    xlinkHref={`#${ids[0]}`}
                    transform="translate(1111 -974)"
                    fill={calcFill({ fill, disabled, light, colors })}
                  />
                </g>
                <g>
                  <use
                    xlinkHref={`#${ids[0]}`}
                    transform="translate(1117 -974)"
                    fill={calcFill({ fill, disabled, light, colors })}
                  />
                </g>
                <g>
                  <use
                    xlinkHref={`#${ids[0]}`}
                    transform="translate(1105 -968)"
                    fill={calcFill({ fill, disabled, light, colors })}
                  />
                </g>
                <g>
                  <g>
                    <use
                      xlinkHref={`#${ids[1]}`}
                      transform="translate(1111 -968)"
                      fill={calcFill({ fill, disabled, light, colors })}
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <use
                      xlinkHref={`#${ids[1]}`}
                      transform="translate(1117 -968)"
                      fill={calcFill({ fill, disabled, light, colors })}
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <use
                      xlinkHref={`#${ids[1]}`}
                      transform="translate(1105 -962)"
                      fill={calcFill({ fill, disabled, light, colors })}
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <use
                      xlinkHref={`#${ids[1]}`}
                      transform="translate(1111 -962)"
                      fill={calcFill({ fill, disabled, light, colors })}
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <use
                      xlinkHref={`#${ids[1]}`}
                      transform="translate(1117 -962)"
                      fill={calcFill({ fill, disabled, light, colors })}
                    />
                  </g>
                </g>
              </g>
            </g>
            <defs>
              <path
                id={ids[0]}
                d="M 2.5 5C 3.88071 5 5 3.88071 5 2.5C 5 1.11929 3.88071 0 2.5 0C 1.11929 0 0 1.11929 0 2.5C 0 3.88071 1.11929 5 2.5 5Z"
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
