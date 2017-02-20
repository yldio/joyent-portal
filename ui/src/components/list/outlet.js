import { is } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import Column from '../column';
import styled from 'styled-components';
import React from 'react';

const StyledColumn = styled(Column)`
  display: block;

  ${is('collapsed')`
    display: none;
  `};
`;

const Outlet = ({
  children,
  ...props
}) => (
  <StyledColumn
    md={6}
    name='list-item-outlet'
    xs={12}
    {...props}
  >
    {children}
  </StyledColumn>
);

Outlet.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Outlet
);
