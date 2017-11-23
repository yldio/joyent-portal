import React from 'react';
import Colors from './colors';

export default ({ light = false, ...rest }) => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg
        width="9"
        height="13"
        viewBox="0 0 9 13"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={light ? white : secondary}
          fillRule="evenodd"
          d="M0 13h9V0H0v13zm2-2h5V2H2v9zm1-7h3.001V3H3v1zm0 2h3.001V5H3v1zm0 2h3.001V7H3v1z"
        />
      </svg>
    )}
  </Colors>
);
