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
            viewBox="0 0 15 15"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ ...style, ...rotateStyle }}
            {...rest}
          >
            <g transform="translate(18240 -18581)">
              <g>
                <mask>
                  <rect
                    xlinkHref={`#${ids[0]}`}
                    fill="white"
                    x={-1}
                    y={-1}
                    width={15}
                    height={16}
                    transform="matrix(6.12323e-17 1 -1 6.12323e-17 -18226 18582)"
                  />
                  <use
                    xlinkHref={`#${ids[1]}`}
                    fill={calcFill({ fill, disabled, light, colors })}
                    transform="matrix(6.12323e-17 1 -1 6.12323e-17 -18226 18582)"
                  />
                </mask>
                <g mask={`url(#${ids[0]})`}>
                  <use
                    xlinkHref={`#${ids[2]}`}
                    transform="matrix(6.12323e-17 1 -1 6.12323e-17 -18226 18582)"
                    fill={calcFill({ fill, disabled, light, colors })}
                  />
                </g>
              </g>
            </g>
            <defs>
              <path
                id={ids[1]}
                d="M 5.59466 1.92996C 5.9545 1.16288 7.0455 1.16288 7.40534 1.92996L 11.4608 10.5753C 11.7719 11.2385 11.288 12 10.5555 12L 2.44449 12C 1.71201 12 1.22807 11.2385 1.53915 10.5753L 5.59466 1.92996Z"
              />
              <path
                id={ids[2]}
                d="M 1.53915 10.5753L -0.271523 9.72593L 1.53915 10.5753ZM 7.40534 1.92996L 5.59466 2.77934L 7.40534 1.92996ZM 5.59466 2.77934L 9.65017 11.4247L 13.2715 9.72593L 9.21601 1.08058L 5.59466 2.77934ZM 10.5555 10L 2.44449 10L 2.44449 14L 10.5555 14L 10.5555 10ZM 3.34983 11.4247L 7.40534 2.77934L 3.78399 1.08058L -0.271523 9.72593L 3.34983 11.4247ZM 2.44449 10C 3.17698 10 3.66091 10.7615 3.34983 11.4247L -0.271523 9.72593C -1.20476 11.7154 0.247037 14 2.44449 14L 2.44449 10ZM 9.65017 11.4247C 9.33909 10.7615 9.82302 10 10.5555 10L 10.5555 14C 12.753 14 14.2048 11.7154 13.2715 9.72593L 9.65017 11.4247ZM 9.21601 1.08058C 8.13651 -1.22066 4.86349 -1.22066 3.78399 1.08058L 7.40534 2.77934C 7.0455 3.54642 5.9545 3.54642 5.59466 2.77934L 9.21601 1.08058Z"
              />
            </defs>
          </svg>
        )}
      </Rotate>
    )}
  </Colors>
);
