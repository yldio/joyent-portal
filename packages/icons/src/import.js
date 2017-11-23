import React from 'react';
import Colors from './colors';

export default props => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
      >
        <g transform="translate(-2061 2768)">
          <clipPath id="a" clipRule="evenodd">
            <path fill={white} d="M2061-2768h24v24h-24v-24z" />
          </clipPath>
          <g clipPath="url(#a)">
            <path fill={white} d="M2061-2768h24v24h-24v-24z" />
            <use
              xlinkHref="#b"
              fill={secondary}
              transform="translate(2061 -2754)"
            />
            <use
              xlinkHref="#c"
              fill={secondary}
              transform="translate(2072 -2768)"
            />
            <use
              xlinkHref="#d"
              fill={secondary}
              transform="translate(2067.29 -2755)"
            />
          </g>
        </g>
        <defs>
          <path id="b" fillRule="evenodd" d="M0 0h2v8h20V0h2v10H0V0z" />
          <path id="c" fillRule="evenodd" d="M0 0h2v18H0V0z" />
          <path
            id="d"
            fillRule="evenodd"
            d="M1.414 0L0 1.414l4.295 4.292.655.658.759.756 5.705-5.705L10 0 5.707 4.293 1.414 0z"
          />
        </defs>
      </svg>
    )}
  </Colors>
);
