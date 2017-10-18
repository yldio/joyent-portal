import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import Baseline from '../baseline';

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: ${remcalc(18)} 0 0 0;
`;

/**
 * @example ./usage.md
 */
const SectionList = ({ children, ...rest }) => (
  <UnorderedList {...rest}>{children}</UnorderedList>
);

export default Baseline(SectionList);

export { default as Item } from './item';
