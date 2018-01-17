import React from 'react';
import rndId from 'rnd-id';

import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId()];

export default ({
  fill = null,
  light = false,
  secondary = false,
  disabled = false,
  direction = 'down',
  colors = {},
  style = {},
  ...rest
}) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) => (
      <svg
        width="24"
        height="6"
        viewBox="0 0 24 6"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <use
          xlinkHref={`#${ids[0]}`}
          fill={calcFill({
            fill,
            disabled,
            light,
            colors: {
              ...colors,
              text: secondary ? colors.text : colors.primary
            }
          })}
        />
        <use
          xlinkHref={`#${ids[0]}`}
          transform="translate(9)"
          opacity=".5"
          fill={calcFill({
            fill,
            disabled,
            light,
            colors: {
              ...colors,
              text: secondary ? colors.text : colors.primary
            }
          })}
        />
        <use
          xlinkHref={`#${ids[0]}`}
          transform="translate(18)"
          opacity=".25"
          fill={calcFill({
            fill,
            disabled,
            light,
            colors: {
              ...colors,
              text: secondary ? colors.text : colors.primary
            }
          })}
        />
        <defs>
          <path id={ids[0]} fillRule="evenodd" d="M0 0h6v6H0V0z" />
        </defs>
      </svg>
    )}
  </Rotate>
);
