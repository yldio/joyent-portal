import React from 'react';
import Colors from './colors';

export default ({ light = false, disabled, ...rest, }) => (
  <Colors white secondary>
    {({ white, text }) => (
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={light ? white : text}
          style={{
            transform: 'rotate(90deg) translateX(-2px) translateY(1px)',
            transformOrigin: '50%'
          }}
          d="M 2.33975 15L 1.47372 14.5L 2.33975 15ZM 19.6603 15L 18.7942 15.5L 19.6603 15ZM 18.7942 16.5L 18.7942 15.5L 18.7942 16.5ZM 11.866 1.5L 12.7321 1L 11.866 1.5ZM 10.134 1.5L 11 2L 10.134 1.5ZM 11 2L 18.7942 15.5L 20.5263 14.5L 12.7321 1L 11 2ZM 18.7942 15.5L 3.20577 15.5L 3.20577 17.5L 18.7942 17.5L 18.7942 15.5ZM 3.20577 15.5L 11 2L 9.26795 1L 1.47372 14.5L 3.20577 15.5ZM 3.20577 15.5L 3.20577 15.5L 1.47372 14.5C 0.70392 15.8333 1.66617 17.5 3.20577 17.5L 3.20577 15.5ZM 18.7942 15.5L 18.7942 15.5L 18.7942 17.5C 20.3338 17.5 21.2961 15.8333 20.5263 14.5L 18.7942 15.5ZM 12.7321 1C 11.9622 -0.333334 10.0377 -0.333332 9.26795 1L 11 2L 11 2L 12.7321 1Z"
        />
      </svg>
    )}
  </Colors>
);
