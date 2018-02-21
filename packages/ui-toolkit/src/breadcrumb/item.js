import React from 'react';
import styled, { withTheme } from 'styled-components';
import remcalc from 'remcalc';

import { H4 } from '../text/headings';
import { Arrow as BaseArrow } from '../icons';

const Name = H4.extend`
  font-weight: normal;
  margin: ${remcalc(12)} 0;
`;

const Arrow = styled(BaseArrow)`
  margin: ${remcalc(3)} ${remcalc(10)};
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;

  &:last-child {
    svg {
      display: none;
    }
  }
`;

const BaseLink = styled(({ component, children, ...rest }) =>
  React.createElement(component, rest, children)
)`
  text-decoration: none;
  cursor: pointer;
  font-weight: ${props => props.theme.font.weight.normal};

  &:visited {
    color: inherit;
  }
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
