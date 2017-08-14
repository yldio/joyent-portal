import styled from 'styled-components';
import remcalc from 'remcalc';
import P from '../text/p';

export default styled(P)`
  margin: 0 ${remcalc(18)};
  color: ${props => props.theme.white};
  white-space: nowrap;
`;
