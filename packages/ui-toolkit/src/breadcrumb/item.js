import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import remcalc from 'remcalc';

import typography from '../typography';
import { H2 } from '../text/headings';

const LinkChild = styled(Link)`
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: inherit;
  }
`;

const Name = H2.extend`
  ${typography.normal};

  color: ${props => props.theme.primary};
  margin: ${remcalc(20)} 0 ${remcalc(18)} 0;
  display: inline-block;
`;

const Arrow = styled.div`
  border: solid ${props => props.theme.text};
  border-width: 0 ${remcalc(2)} ${remcalc(2)} 0;
  display: inline-block;
  padding: ${remcalc(2)};
  transform: rotate(-45deg);
  margin: ${remcalc(3)} ${remcalc(10)} ${remcalc(3)} ${remcalc(10)};
`;

const Container = styled.div`
  display: inline-block;
`;

export default ({ to, children, ...rest }) => {
  const _child = to ? <LinkChild to={to}>{children}</LinkChild> : children;

  return (
    <Container>
      <Name name="breadcrum-item" {...rest}>
        {_child}
      </Name>
      <Arrow />
    </Container>
  );
};
