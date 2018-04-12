import styled from 'styled-components';
import remcalc from 'remcalc';

import is from 'styled-is';

export default styled.strong`
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.font.weight.bold};
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};

  ${is('inline')`
    display: inline-block;
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;
