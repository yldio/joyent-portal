import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import remcalc from 'remcalc';

import typography from '../typography';
import { H2 } from '../text/headings';
import Chevron from '../icons/chevron';

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
  margin: ${remcalc(12)} 0;
`;

const Arrow = styled(Chevron)`
  margin: ${remcalc(8)} ${remcalc(10)} ${remcalc(3)} ${remcalc(10)};
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
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
