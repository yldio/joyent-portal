import { Subscriber } from 'react-broadcast';
import { is, remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import Column from '../column';
import styled from 'styled-components';
import React from 'react';

const StyledColumn = styled(Column)`
  display: block;
  min-width: auto;
  max-width: ${remcalc(480)};
  margin-left: auto;

  ${is('collapsed')`
    display: none;
  `};
`;

const Outlet = ({
  children,
  ...props
}) => {
  const render = ({
    collapsed = false
  }) => (
    <StyledColumn
      name='list-item-outlet'
      collapsed={collapsed}
      xs={6}
      {...props}
    >
      {children}
    </StyledColumn>
  );

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

Outlet.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

export default Baseline(
  Outlet
);
