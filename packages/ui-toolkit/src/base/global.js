import { css } from 'styled-components';
import remcalc from 'remcalc';

export default ({ theme }) => css`
  @import url('${theme.font.href()}');
  @import url('${theme.monoFont.href()}');

  [hidden] {
    display: none;
  }

  html, body {
    font-display: optional;
    font-family: ${theme.font.families};
    font-weight: ${theme.font.weight.normal};
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
    color: ${theme.text};
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  body > #root {
    display: flex;
    flex-flow: column;
  }

  .CodeMirror,
  .ReactCodeMirror {
    height: 100% !important;
  }

  .CodeMirror {
    border: solid 1px ${theme.grey};
    margin: ${remcalc(8)} 0 ${remcalc(8)} 0;
    font-family: "Roboto Mono", monospace !important;
  }
`;
