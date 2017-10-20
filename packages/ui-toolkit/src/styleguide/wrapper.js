import React, { Component } from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import theme from '../theme';
import Base from '../base';
import { loadedFontFamily } from '../typography';
import 'codemirror/mode/jsx/jsx';

const StyledBase = Base.extend`
  /* trick prettier */
  background-color: transparent;
`;

export default class Wrapper extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      [hidden] {
        display: none;
      }

      html {
        line-height: 1.15;
        text-size-adjust: 100%;
      }

      body {
        font-size: 15px;
        margin: 0;
        padding: 0;
        background: ${theme.background};

        ${loadedFontFamily};
      }

      html,
      body,
      #root {
        height: 100%;
      }

      .CodeMirror,
      .ReactCodeMirror {
        height: 100% !important;
      }

      .CodeMirror {
        border: solid 1px ${theme.grey};
      }
    `;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledBase>{this.props.children}</StyledBase>
      </ThemeProvider>
    );
  }
}
