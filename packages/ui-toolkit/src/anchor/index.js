import React from 'react';
import styled, { css } from 'styled-components';
import { A } from 'normalized-styled-components';
import is, { isOr } from 'styled-is';
import PropTypes from 'prop-types';
import { Link as BaseLink } from 'react-router-dom';
import Baseline from '../baseline';

const style = css`
  color: ${props => props.theme.primary};

  &:hover {
    text-decoration: none;
  }

  ${isOr('secondary', 'reversed')`
    color: ${props => props.theme.white};
  `};

  ${is('disabled')`
    color: ${props => props.theme.grey};
    pointer-events: none;

    &:hover {
      text-decoration: underline;
    }
  `};
`;

const StyledAnchor = A.extend`
  /* trick prettier */
  ${style};
`;

const StyledLink = styled(BaseLink)`
  /* trick prettier */
  ${style};
`;

/**
 * @example ./usage.md
 */
const Anchor = ({ children, ...rest }) => {
  const { to = '' } = rest;

  const Views = [() => (to ? StyledLink : null), () => StyledAnchor];
  const View = Views.reduce((sel, view) => (sel ? sel : view()), null);

  return <View {...rest}>{children}</View>;
};

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
