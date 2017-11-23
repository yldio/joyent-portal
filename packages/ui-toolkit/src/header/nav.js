import React from 'react';
import styled from 'styled-components';

const UL = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
  color: ${props => props.theme.white};
`;

export default ({ children, ...rest }) => <UL {...rest}>{children}</UL>;
