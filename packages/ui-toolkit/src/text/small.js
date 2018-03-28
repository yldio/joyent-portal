import { Small } from 'normalized-styled-components';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';
import styled from 'styled-components';

export default styled(Small)`
  font-family: ${props => props.theme.font.families};
  color: ${props => props.theme.text};

  line-height: ${remcalc(18)};
  font-size: ${remcalc(13)};

  ${isNot('noMargin')`
    padding-bottom: ${remcalc(12)};
  `};

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};
`;
