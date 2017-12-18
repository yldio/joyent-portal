import React from 'react';
import styled from 'styled-components';
import { A } from 'normalized-styled-components';
import is, { isOr } from 'styled-is';
import PropTypes from 'prop-types';
import Baseline from '../baseline/index.js';

const BaseLink = styled(({ component, children, ...rest }) =>
  React.createElement(component, rest, children)
)`
  color: ${props => props.theme.primary};
  -webkit-text-fill-color: ${props => props.theme.primary};

  &:hover {
    text-decoration: none;
  }

  ${isOr('secondary', 'reversed')`
    color: ${props => props.theme.white};
    -webkit-text-fill-color: ${props => props.theme.white};
  `};

  ${is('disabled')`
    color: ${props => props.theme.grey};
    -webkit-text-fill-color: ${props => props.theme.grey};
    pointer-events: none;

    &:hover {
      text-decoration: underline;
    }
  `};
`;

/**
 * @example ./usage.md
 */
const Anchor = ({ children, component, ...rest }) => (
  <BaseLink {...rest} activeClassName="active" component={component || A}>
    {children}
  </BaseLink>
);

Anchor.propTypes = {
  /**
   * The `<a>` text
   */
  children: PropTypes.node,
  secondary: PropTypes.bool
};

Anchor.defaultProps = {
  secondary: false
};

export default Baseline(Anchor);
