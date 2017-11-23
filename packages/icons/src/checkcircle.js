import React from 'react';
import remcalc from 'remcalc';

import Colors from './colors';
import Rotate from './rotate';

export const Tick = props => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.316 0L3.254 5.477l-1.55-2.165L0 4.495 3.223 9 9 1.21z"
    />
  </svg>
);

export const Completed = props => (
  <Colors white text greenDark>
    {({ white, text, greenDark }) => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fill={greenDark}
          fill-rule="evenodd"
          d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z"
        />
        <path
          fill-rule="evenodd"
          fill={white}
          d="M12.017 5l-3.896 5.336-1.487-2.109L5 9.379l3.091 4.389 5.541-7.589L12.017 5z"
        />
      </svg>
    )}
  </Colors>
);

export const PartCompleted = props => (
  <Colors white text greenDark>
    {({ white, text, greenDark }) => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        style={{ padding: '1px' }}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fill={white}
          fillRule="evenodd"
          d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z"
        />
        <path
          fill={greenDark}
          d="M9 19c5.523 0 10-4.477 10-10h-2a8 8 0 0 1-8 8v2zM19 9C19 3.477 14.523-1 9-1v2a8 8 0 0 1 8 8h2zM9-1C3.477-1-1 3.477-1 9h2a8 8 0 0 1 8-8v-2zM-1 9c0 5.523 4.477 10 10 10v-2a8 8 0 0 1-8-8h-2z"
        />
        <path
          fill={text}
          fillRule="evenodd"
          d="M12.316 5l-4.062 5.477-1.55-2.165L5 9.495 8.223 14 14 6.21 12.316 5z"
        />
      </svg>
    )}
  </Colors>
);

export const Incomplete = props => (
  <Colors white text>
    {({ white, text }) => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        style={{ padding: remcalc(1) }}
        {...props}
      >
        <path
          fill={white}
          fillRule="evenodd"
          d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z"
        />
        <path
          fill={text}
          d="M9 19c5.523 0 10-4.477 10-10h-2a8 8 0 0 1-8 8v2zM19 9C19 3.477 14.523-1 9-1v2a8 8 0 0 1 8 8h2zM9-1C3.477-1-1 3.477-1 9h2a8 8 0 0 1 8-8v-2zM-1 9c0 5.523 4.477 10 10 10v-2a8 8 0 0 1-8-8h-2z"
        />
      </svg>
    )}
  </Colors>
);

export default ({
  fill,
  checked,
  border,
  direction = 'down',
  style = {},
  ...rest
}) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) => {
      if (fill && checked) {
        return <Completed style={{ ...style, ...rotateStyle }} {...rest} />;
      }

      if (checked && border) {
        return <PartCompleted style={{ ...style, ...rotateStyle }} {...rest} />;
      }

      if (checked) {
        return <Tick style={{ ...style, ...rotateStyle }} {...rest} />;
      }

      return <Incomplete style={{ ...style, ...rotateStyle }} {...rest} />;
    }}
  </Rotate>
);
