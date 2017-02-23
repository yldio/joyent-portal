import { is } from '../../shared/functions';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';
import React from 'react';

const StyledAnchor = styled.a`
  color: ${colors.base.primary} !important;

  ${is('secondary')`
    color: ${colors.base.secondary} !important;
  `}
`;

export default Baseline(
  StyledAnchor
);

export const fn = (element) => (props) => React.cloneElement(element, {
  ...element.props,
  ...props
}, element.props.children);
