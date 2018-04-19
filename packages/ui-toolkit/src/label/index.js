import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

const Label = styled.label`
  font-size: ${remcalc(15)};
  line-height: ${remcalc(18)};
  font-style: normal;
  font-stretch: normal;
  display: block;
  color: ${props => props.theme.secondary};
  text-align: left;

  ${is('inline')`
    display: inline-block;
  `};
`;

export default Label;
