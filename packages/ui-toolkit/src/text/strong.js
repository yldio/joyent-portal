import styled from 'styled-components';
import remcalc from 'remcalc';

import is, { isNot } from 'styled-is';

export default styled.strong`
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.font.weight.bold};
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
  margin: 0;

  ${is('inline')`
    display: inline-block;
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};

  ${isNot('noMargin')`
    & + p,
    & + small,
    & + h1,
    & + h2,
    & + label,
    & + h3,
    & + h4,
    & + h5,
    & + div,
    & + span {
      padding-bottom: ${remcalc(36)};
    }
  `};
`;
