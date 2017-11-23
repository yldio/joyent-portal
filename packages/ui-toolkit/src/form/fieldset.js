import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';

import Baseline from '../baseline';

const StyledFieldset = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  height: auto;

  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
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

export default Baseline(Fieldset);
