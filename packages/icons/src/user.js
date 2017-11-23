import React from 'react';
import Colors from './colors';

export default ({ light = false, ...rest }) => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path fill={light ? white : secondary} d="M12 12H0a5.958 5.958 0 0 1 1.485-3.552 1.368 1.368 0 0 1 1.726-.296 4.83 4.83 0 0 0 5.201-.248 1.384 1.384 0 0 1 1.75.152A5.968 5.968 0 0 1 12 12zM5.619 0a3.205 3.205 0 0 0-3.211 3.2c0 1.768 1.42 4 3.21 4s3.211-2.232 3.211-4A3.204 3.204 0 0 0 5.62 0z" />
      </svg>
    )}
  </Colors>
);
