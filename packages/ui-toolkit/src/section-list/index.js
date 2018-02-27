import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import Baseline from '../baseline';

const UnorderedList = styled.ul`
  background: ${props => props.theme.disabled};
  list-style-type: none;
  padding: ${remcalc(13)} ${remcalc(0)};
  margin: ${remcalc(18)} 0 0 0;
  max-height: 50px;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  display: inline-flex;
  position: relative;

  &:after {
    width: 100%;
    height: ${remcalc(1)};
    background: ${props => props.theme.grey};
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`;

/**
 * @example ./usage.md
 */
const SectionList = ({ children, mode, ...rest }) => (
  <UnorderedList {...rest}>{children}</UnorderedList>
);

export default Baseline(SectionList);

export { default as Item, Anchor } from './item';
