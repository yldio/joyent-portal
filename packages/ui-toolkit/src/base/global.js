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
    min-height: calc(100vh - ${remcalc(48)});
  }

  #header {
    z-index: 9999;
  }

  body > #root {
    display: flex;
    flex-flow: column;
  }

  .CodeMirror {
    height: 130px;
    border: solid ${remcalc(1)} ${theme.grey};
    margin: ${remcalc(8)} 0 ${remcalc(8)} 0;
    font-family: "Roboto Mono", monospace !important;
  }
  
  .CodeMirror.cm-s-eclipse.CodeMirror-wrap,
  .CodeMirror-gutter,
  .CodeMirror-scroll {
    height: auto !important;
  }
  
  [name=user-script] .CodeMirror {
    margin: 0;
  }
`;
