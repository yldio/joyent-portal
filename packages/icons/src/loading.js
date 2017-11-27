import React from 'react';
import rndId from 'rnd-id';

import Colors from './colors';

const ids = [rndId()];

export default ({
  light = false,
  secondary = false,
  disabled = false,
  ...rest
}) => (
  <Colors white primary secondary grey>
    {colors => (
      <svg
        width="24"
        height="6"
        viewBox="0 0 24 6"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
      >
        <use
          xlinkHref={`#${ids[0]}`}
          fill={
            disabled
              ? colors.grey
              : light
                ? colors.white
                : secondary ? colors.secondary : colors.primary
          }
        />
        <use
          xlinkHref={`#${ids[0]}`}
          transform="translate(9)"
          opacity=".5"
          fill={
            disabled
              ? colors.grey
              : light
                ? colors.white
                : secondary ? colors.secondary : colors.primary
          }
        />
        <use
          xlinkHref={`#${ids[0]}`}
          transform="translate(18)"
          opacity=".25"
          fill={
            disabled
              ? colors.grey
              : light
                ? colors.white
                : secondary ? colors.secondary : colors.primary
          }
        />
        <defs>
          <path id={ids[0]} fillRule="evenodd" d="M0 0h6v6H0V0z" />
        </defs>
      </svg>
    )}
  </Colors>
);
