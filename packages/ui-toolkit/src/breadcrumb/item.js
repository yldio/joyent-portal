import React from 'react';
import styled, { withTheme } from 'styled-components';
import remcalc from 'remcalc';

import { H4 } from '../text/headings';
import { Arrow } from '../icons';

const Name = styled(H4)`
  font-weight: normal;
  margin: 0;
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;

  &:first-child {
    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &:last-child {
    svg {
      display: none;
    }
  }
`;

const BaseLink = styled(({ component, children, ...rest }) =>
  React.createElement(component, rest, children)
)`
  cursor: pointer;
  font-weight: ${props => props.theme.font.weight.normal};
  color: ${props => props.theme.primary};
`;

export default withTheme(({ children, component, theme, ...rest }) => {
  const _child = component ? (
    <BaseLink {...rest} component={component}>
      {children}
    </BaseLink>
  ) : (
    children
  );

  return (
    <Container>
      <Name name="breadcrum-item">{_child}</Name>
      <Arrow direction="left" fill={theme.greyDark} />
    </Container>
  );
});
