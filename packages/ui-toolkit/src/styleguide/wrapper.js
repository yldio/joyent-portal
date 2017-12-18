import React from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';

import theme from '../theme';
import Base from '../base';
import { RootContainer } from '../layout';
import 'codemirror/mode/jsx/jsx';

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin');

  button {
    cursor: pointer;
  }

  code, .CodeMirror-line * {
   font-family: 'Roboto Mono'; 
  }
`;

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
