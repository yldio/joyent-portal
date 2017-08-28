import React from 'react';
import styled from 'styled-components';
import Baseline from '../baseline';

const StyledItem = styled.li`
  float: left;
  background-color: ${props => props.theme.white};
`;

const ProgressbarItem = ({ children, ...props }) => (
  <StyledItem {...props}>{children}</StyledItem>
);

export default Baseline(ProgressbarItem);
