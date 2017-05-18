import { css } from 'styled-components';
import { fonts } from '../typography';
import theme from '../theme';

export default css`
  ${fonts.libreFranklin.normal};
  ${fonts.libreFranklin.medium};
  ${fonts.libreFranklin.semibold};

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
    font-family: 'Libre Franklin'
  }
`;
