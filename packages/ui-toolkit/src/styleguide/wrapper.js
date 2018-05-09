import React from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import theme from '../theme';
import Base from '../base';
import { RootContainer } from '../layout';
import 'codemirror/mode/jsx/jsx';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:700,400');
  @import url('https://fonts.googleapis.com/css?family=Libre+Franklin:400,500,600,700');

  button {
    cursor: pointer;
  }

  code, .CodeMirror-line * {
   font-family: 'Roboto Mono';
  }
`;

const StyledBase = styled(Base)`
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
