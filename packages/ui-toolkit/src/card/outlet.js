import { Subscriber } from 'react-broadcast';
import typography from '../typography';
import Baseline from '../baseline';
import { Col } from 'react-styled-flexboxgrid';
import is from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const StyledCol = Col.extend`
  ${typography.fontFamily};
  ${typography.normal};

  display: block;
  min-width: auto;
  max-width: ${remcalc(480)};
  margin-left: auto;

  ${is('collapsed')`
    display: none;
  `};
`;

const Outlet = ({ children, ...rest }) => {
  const render = ({ collapsed = false }) => (
    <StyledCol name="card-outlet" collapsed={collapsed} xs={6} {...rest}>
      {children}
    </StyledCol>
  );

  return (
    <Subscriber channel="card">
      {render}
    </Subscriber>
  );
};

Outlet.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool
};

export default Baseline(Outlet);
