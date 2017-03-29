import { css } from 'styled-components';
import { colors } from '../../shared/constants';
import { libreFranklin } from '../fonts';

export default css`
  ${libreFranklin.normal}
  ${libreFranklin.medium}
  ${libreFranklin.semibold}

  html, body {
    font-size: 15px;
    margin: 0;
    padding: 0;
    background: ${colors.base.background};
  }
`;
