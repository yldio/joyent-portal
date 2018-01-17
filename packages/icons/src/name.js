import React from 'react';

import Rotate from './rotate';
import calcFill from './fill';

export default ({
  fill = null,
  light = false,
  disabled = false,
  direction = 'down',
  colors = {},
  style = {},
  ...rest
}) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) => (
      <svg
        viewBox="0 0 16.24 13.55"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="17"
        height="17"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          d="M.24,13.55c-1-2,1.39-6.73,1.52-7C4.47,1.5,6.77-.55,9,.12a2.34,2.34,0,0,1,1.4,1.16c.54,1.06-.26,2.41-1.18,4-.55.91-1.69,3.42-1.78,3.67-.37,1-.88,2.35-.52,2.86.19.28.73.34,1.14.34s1-.77,1.31-1.49c.56-1.48,1.87-4.94,4.1-4.27,1.78.53,1.27,2.56.93,3.91s-.11,1.51-.1,1.52a2.21,2.21,0,0,0,1.95-.24v1c-1.41.73-2.11.72-2.74.21-.88-.71-.48-2.19-.33-2.75.38-1.52.47-2.3-.07-2.46-.73-.22-1.6,1-2.57,3.52-.4,1.1-1.26,2.3-2.48,2.3a2.48,2.48,0,0,1-2.17-.88c-.72-1.05-.14-2.62.38-4,.09-.23,1.3-2.91,1.87-3.87s2.11-3.06.49-3.29S5.18,2.83,2.87,7.16c-1.71,3.21-1.78,5.95-1.62,6.39Z"
          fill={calcFill({ fill, disabled, light, colors })}
        />
      </svg>
    )}
  </Rotate>
);
