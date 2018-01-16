import remcalc from 'remcalc';
import styled from 'styled-components';

export default styled.span`
  width: ${remcalc(6)};
  height: ${remcalc(6)};
  border-radius: 50%;
  background-color: ${props => props.theme[props.color]};
  display: inline-block;
`;
