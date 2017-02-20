import React from 'react';
import styled from 'styled-components';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';

const StyledTitle = styled.h4`
  margin: 0;
  color: ${colors.fonts.semibold};
`;

const Title = ({
  children
}) => (
  <StyledTitle name='add-metric-title'>
    {children}
  </StyledTitle>
);

Title.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Title
);
