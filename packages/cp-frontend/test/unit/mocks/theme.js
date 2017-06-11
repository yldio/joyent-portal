import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'joyent-ui-toolkit';

export default ({ children }) =>
  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
