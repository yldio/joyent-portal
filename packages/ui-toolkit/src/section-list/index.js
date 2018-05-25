import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

const UnorderedList = styled.ul`
  background: ${props => props.theme.disabled};
  list-style-type: none;
  padding: 0 0 ${remcalc(12)} 0;
  max-height: ${remcalc(50)};
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  display: inline-flex;
  position: relative;
  margin: 0;

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

  ${is('clear')`
    background: none !important;
  `};
`;

/**
 * @example ./usage.md
 */
const SectionList = ({ children, mode, ...rest }) => (
  <UnorderedList {...rest}>{children}</UnorderedList>
);

export default SectionList;

export { default as Item, Anchor } from './item';
