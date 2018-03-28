import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';

const StyledFieldset = styled.div`
  display: inline-block;
  padding: 0;
  border: none;
  overflow: hidden;
  height: auto;

  -webkit-padding-before: 0;
  -webkit-padding-start: 0;
  -webkit-padding-end: 0;
  -webkit-padding-after: 0;

  ${is('fluid')`
    width: 100%;
  `};

  ${is('right')`
    float: right;
  `};
`;

const Fieldset = ({ children, ...rest }) => (
  <StyledFieldset role="group" {...rest}>
    {children}
  </StyledFieldset>
);

export default Fieldset;
