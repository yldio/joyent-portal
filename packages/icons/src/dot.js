import remcalc from 'remcalc';
import styled from 'styled-components';

export default styled.span`
  width: ${props => props.size || remcalc(6)};
  height: ${props => props.size || remcalc(6)};
  border-radius: 50%;
  background-color: ${props => props.theme[props.color]};
  display: inline-block;
  margin-right: ${props => props.right || remcalc(0)};
  margin-left: ${props => props.left || remcalc(0)};
`;
