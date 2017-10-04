import styled from 'styled-components';
import Baseline from '../baseline';
import typography from '../typography';
import remcalc from 'remcalc';

const Label = styled.label`
  ${typography.normal};

  font-size: ${remcalc(15)};
  font-style: normal;
  font-stretch: normal;
  display: block;
  color: ${props => props.theme.secondary};
  text-align: left;
`;

export default Baseline(Label);
