import React from 'react';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: underline;
`;

const Link = ({
  children,
  href
}) => (
  <StyledLink href={href} name='add-metric-link'>
    {children}
  </StyledLink>
);

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired
};

export default Baseline(
  Link
);
