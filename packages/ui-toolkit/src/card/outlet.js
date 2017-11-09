import React from 'react';
import { Subscriber } from 'joy-react-broadcast';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';
import is from 'styled-is';

import Baseline from '../baseline';
import Card, { BaseCard } from './card';

const BaseOutlet = BaseCard.extend`
  box-sizing: border-box;

  display: inline-flex;
  flex: 1 1 auto;
  flex-direction: column;
  border-width: 0;
  padding: ${remcalc(13)};
  margin-bottom: 0;

  background-color: transparent;

  ${is('collapsed')`
    display: none;
  `};

  ${is('pullUp')`
    margin-top: ${remcalc(-48)};
  `};

  & > [name='card']:not(:last-child) {
    margin-bottom: ${remcalc(13)};
  }

  & > [name='card']:last-child {
    margin-bottom: ${remcalc(7)};
  }
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

export default Baseline(Outlet);
