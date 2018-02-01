import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

export default styled.sup`
  position: absolute;
  margin-top: ${remcalc(-20)};
  border-radius: ${remcalc(3)};
  font-weight: ${props => props.theme.font.weight.semibold};
  line-height: normal;
  font-size: ${remcalc(8)};
  color: ${props => props.theme.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${is('badge')`
    padding: ${remcalc(2)} ${remcalc(3)};
    background: ${props => props.theme.primary};
    color: ${props => props.theme.white};
  `};
`;
