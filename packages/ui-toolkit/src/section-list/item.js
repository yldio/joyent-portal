import styled, { css } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import BaseAnchor from '../anchor';

const border = css`
  width: 100%;
  height: ${remcalc(1)};
  background: ${props => props.theme.secondary};
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
`;

export default styled.li`
  font-size: ${remcalc(15)};
  line-height: 1.6;
  flex-shrink: 0;
`;

export const Anchor = styled(BaseAnchor)`
  color: ${props => props.theme.secondary};
  text-decoration: none;
  cursor: pointer;
  padding: 0 ${remcalc(12)};
  padding-bottom: ${remcalc(16)};
  position: relative;

  &.active {
    font-weight: ${props => props.theme.font.weight.semibold};

    &:after {
      ${border};
    }
  }

  ${is('active')`
    font-weight: ${props => props.theme.font.weight.semibold};

    &:after {
      ${border}
    }
  `};
`;
