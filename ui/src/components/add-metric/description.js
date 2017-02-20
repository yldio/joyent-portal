import React from 'react';
import styled from 'styled-components';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';

const StyledDescription = styled.p`
  margin: 0;
  color: ${colors.base.text};
`;

const Description = ({
  children,
  ...props
}) => (
  <StyledDescription name='add-metric-description' {...props}>
    {children}
  </StyledDescription>
);

Description.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Description
);
