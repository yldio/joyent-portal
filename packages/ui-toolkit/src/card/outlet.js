import React from 'react';
import { Subscriber } from 'joy-react-broadcast';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';
import is from 'styled-is';
import styled from 'styled-components';

import Card, { BaseCard } from './card';

const BaseOutlet = styled(BaseCard)`
  box-sizing: border-box;

  display: inline-flex;
  flex: 1 1 auto;
  flex-direction: column;
  border-width: 0;

  background-color: transparent;

  ${is('collapsed')`
    display: none;
  `};
`;

export const Outlet = ({ children, ...rest }) => (
  <Subscriber channel="card">
    {({ secondary, tertiary, collapsed }) => (
      <BaseOutlet
        {...rest}
        name="card-outlet"
        secondary={secondary}
        tertiary={tertiary}
        collapsed={collapsed}
      >
        {children}
      </BaseOutlet>
    )}
  </Subscriber>
);

Outlet.propTypes = {
  ...Card.propTypes,
  children: PropTypes.node
};

Outlet.defaultProps = {
  ...Card.defaultProps,
  children: null
};

export default Outlet;
