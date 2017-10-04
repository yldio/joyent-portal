import { css } from 'styled-components';
import { loadedFontFamily } from '../typography';

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

  .CodeMirror,
  .ReactCodeMirror {
    height: 100% !important;
  }

  .CodeMirror {
    border: solid 1px ${theme.grey};
  }
`;
