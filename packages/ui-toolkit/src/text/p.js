import styled from 'styled-components';
import remcalc from 'remcalc';

import is from 'styled-is';

export default styled.p`
  color: ${props => props.theme.text};

  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
  margin: 0;

  ${is('white')`
    -webkit-text-fill-color: ${props => props.theme.white};
    color: ${props => props.theme.white}
  `};

  + p,
  + small,
  + h1,
  + h2,
  + label,
  + h3,
  + h4,
  + h5,
  + div,
  + span {
    padding-bottom: ${remcalc(36)};
  }
`;
