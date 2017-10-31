import remcalc from 'remcalc';
import styled from 'styled-components';

import Baseline from '../baseline';

export default Baseline(styled.span`
  width: ${remcalc(6)};
  height: ${remcalc(6)};
  border-radius: ${remcalc(3)};
  background-color: ${props => props.theme[props.color]};
  display: inline-block;
`);
