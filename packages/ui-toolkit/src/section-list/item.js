import styled from 'styled-components';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';

import BaseAnchor from '../anchor';

export default styled.li`
  font-size: ${remcalc(15)};
  line-height: 1.6;
  flex-shrink: 0;
`;

export const Anchor = styled(BaseAnchor)`
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.font.weight.text};
  text-decoration: none;
  cursor: pointer;
  padding: 0 ${remcalc(12)};
  padding-bottom: ${remcalc(15)};
  position: relative;

  &:after {
    width: 100%;
    height: ${remcalc(1)};
    background: ${props => props.theme.grey};
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  &.active {
    &:after {
      background: ${props => props.theme.font.regular};
    }
  }

  &.active {
    font-weight: ${props => props.theme.font.weight.semibold};
  }

  ${is('active')`
    font-weight: ${props => props.theme.font.weight.semibold}
  `};

  ${is('white')`
    color: ${props => props.theme.white};

    ${isNot('active')`
      color: ${props => props.theme.greyDark};
    `};

    &:after {
      background: ${props => props.theme.greyDarker};
    };
  `};

  ${is('white', 'active')`
    &:after {
      background: ${props => props.theme.white};
    }
  `};
`;
