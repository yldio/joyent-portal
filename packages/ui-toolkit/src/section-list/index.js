import React from 'react';
import styled from 'styled-components';

import Baseline from '../baseline';

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

/**
 * @example ./usage.md
 */
const SectionList = ({ children, ...rest }) => (
  <UnorderedList {...rest}>{children}</UnorderedList>
);

export default Baseline(SectionList);

export { default as Item, Anchor, Link, NavLink } from './item';
