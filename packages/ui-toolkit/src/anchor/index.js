import React from 'react';
import styled from 'styled-components';
import { A as BaseA } from 'normalized-styled-components';
import is, { isOr } from 'styled-is';
import PropTypes from 'prop-types';

const A = styled(BaseA)`
  font-family: ${props => props.theme.font.families};
`;

const BaseLink = styled(({ component, children, ...rest }) =>
  React.createElement(component, rest, children)
)`
  color: ${props => props.theme.primary};
  -webkit-text-fill-color: currentcolor;
  cursor: pointer;
  text-decoration: underline;

  ${isOr('secondary', 'reversed', 'white')`
    color: ${props => props.theme.white};
    -webkit-text-fill-color: currentcolor;
  `};

  ${isOr('tertiary')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
  `};

  ${is('disabled')`
    color: ${props => props.theme.grey};
    -webkit-text-fill-color: currentcolor;
    pointer-events: none;
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

export default Anchor;
