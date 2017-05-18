import { css } from 'styled-components';
import remcalc from 'remcalc';

export default css`
  margin-bottom: ${remcalc(16)};
  box-shadow:
    0 ${remcalc(8)} 0 ${remcalc(-5)} ${props => props.theme.background},
    0 ${remcalc(8)} ${remcalc(1)} ${remcalc(-4)} ${props => props.theme.grey},
    0 ${remcalc(16)} 0 ${remcalc(-10)} ${props => props.theme.background},
    0 ${remcalc(16)} ${remcalc(1)} ${remcalc(-9)} ${props => props.theme.grey};
`;
