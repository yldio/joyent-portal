import React, { Component } from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';

import theme from '../theme';
import Base from '../base';
import { loadedFontFamily } from '../typography';
import { RootContainer } from '../layout';
import 'codemirror/mode/jsx/jsx';

const StyledBase = Base.extend`
  /* trick prettier */
  background-color: transparent;
`;

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <StyledBase>
      <RootContainer>{children}</RootContainer>
    </StyledBase>
  </ThemeProvider>
);
