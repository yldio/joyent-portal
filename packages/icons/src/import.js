import React from 'react';
import rndId from 'rnd-id';

import Rotate from './rotate';

const ids = [rndId(), rndId(), rndId()];

export default ({ direction = 'down', style = {}, colors = {}, ...rest }) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <g transform="translate(-2061 2768)">
          <clipPath id={`${ids[0]}`} clipRule="evenodd">
            <path fill={colors.white} d="M2061-2768h24v24h-24v-24z" />
          </clipPath>
          <g clipPath={`url(#${ids[0]})`}>
            <path fill={colors.white} d="M2061-2768h24v24h-24v-24z" />
            <use
              xlinkHref={`#${ids[1]}`}
              fill={colors.text}
              transform="translate(2061 -2754)"
            />
            <use
              xlinkHref={`#${ids[2]}`}
              fill={colors.text}
              transform="translate(2072 -2768)"
            />
            <use
              xlinkHref={`#${ids[3]}`}
              fill={colors.text}
              transform="translate(2067.29 -2755)"
            />
          </g>
        </g>
        <defs>
          <path
            id={`${ids[1]}`}
            fillRule="evenodd"
            d="M0 0h2v8h20V0h2v10H0V0z"
          />
          <path id={`${ids[2]}`} fillRule="evenodd" d="M0 0h2v18H0V0z" />
          <path
            id={`${ids[3]}`}
            fillRule="evenodd"
            d="M1.414 0L0 1.414l4.295 4.292.655.658.759.756 5.705-5.705L10 0 5.707 4.293 1.414 0z"
          />
        </defs>
      </svg>
    )}
  </Rotate>
);
