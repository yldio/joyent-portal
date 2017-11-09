import { css } from 'styled-components';
import { loadedFontFamily } from '../typography';
import remcalc from 'remcalc';

export default ({ theme }) => css`
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
  }
`;
