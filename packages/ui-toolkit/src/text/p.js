import styled from 'styled-components';
import remcalc from 'remcalc';

import is from 'styled-is';

export default styled.p`
  color: ${props => props.theme.text};
  margin: 0;

  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
  margin: 0;

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};

  ${is('optional')`
    color: ${props => props.theme.greyDark}
  `};

  ${is('center')`
    text-align: center;
  `};

  ${is('monospace')`
    font-family: ${props => props.theme.monoFont.families};
  `};
`;
