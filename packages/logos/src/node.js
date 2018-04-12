import React from 'react';

export default ({
  fill = null,
  light = false,
  disabled = false,
  colors = {},
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 30 34.22"
    {...rest}
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        y1="225.5"
        x2={30}
        y2="225.5"
        gradientTransform="matrix(1, 0, 0, -1, 0, 242.65)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.01" stopColor="#1b3240" />
        <stop offset={1} stopColor="#436275" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-2"
        x1="-0.1"
        y1="225.58"
        x2="30.85"
        y2="225.58"
        gradientTransform="matrix(1, 0, 0, -1, 0, 242.65)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#436275" />
        <stop offset={1} stopColor="#1b3240" />
      </linearGradient>
    </defs>
    <title>Nodejs</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="svg4300">
        <path
          id="_Path_"
          style={{ fill: 'url(#linear-gradient)' }}
          d="M14.2.3a1.53,1.53,0,0,1,1.6,0L29.2,8A1.6,1.6,0,0,1,30,9.4V24.9a1.6,1.6,0,0,1-.8,1.4L15.8,34a1.53,1.53,0,0,1-1.6,0L.8,26.3A1.6,1.6,0,0,1,0,24.9V9.4A1.6,1.6,0,0,1,.8,8Z"
        />
        <path
          style={{ fill: ' #1b3240', opacity: 0.66, isolation: 'isolate' }}
          d="M28.8,8,15.5.2c-.1-.1-.3-.1-.4-.2L0,25.8a1,1,0,0,0,.5.4l13.4,7.7a1.5,1.5,0,0,0,1.3.1L29.3,8.2C29.1,8.2,29,8.1,28.8,8Z"
        />
        <path
          style={{ fill: 'url(#linear-gradient-2)' }}
          d="M15.9,34l13.4-7.7a1.51,1.51,0,0,0,.7-1.4v-.1L15.6.1a1.53,1.53,0,0,0-1.3.2L1.1,7.9,15.5,34.1C15.6,34.1,15.7,34,15.9,34Z"
        />
      </g>
    </g>
  </svg>
);
