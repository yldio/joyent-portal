import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import BaseAnchor from '../anchor';
import Baseline from '../baseline';

export default Baseline(styled.li`
  display: inline-block;
  font-size: ${remcalc(15)};
  line-height: 1.6;
  margin-right: ${remcalc(23)};
`);

export const Anchor = Baseline(styled(BaseAnchor)`
  color: ${props => props.theme.secondary};
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: ${props => props.theme.primary};
    cursor: default;
  }

  ${is('active')`
    color: ${props => props.theme.primary};
    cursor: default;
  `};
`);
