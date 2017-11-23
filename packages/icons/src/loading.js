import React from 'react';
import Colors from './colors';

export default props => (
  <Colors primary>
    {({ primary }) => (
      <svg
        width="24"
        height="6"
        viewBox="0 0 24 6"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
      >
        <use xlinkHref="#a" fill={primary} />
        <use
          xlinkHref="#a"
          transform="translate(9)"
          fill={primary}
          opacity=".5"
        />
        <use
          xlinkHref="#a"
          transform="translate(18)"
          fill={primary}
          opacity=".25"
        />
        <defs>
          <path id="a" fillRule="evenodd" d="M0 0h6v6H0V0z" />
        </defs>
      </svg>
    )}
  </Colors>
);
