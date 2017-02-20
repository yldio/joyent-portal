import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import React from 'react';

const Item = styled.div`
  display: inline-block;
  float: left;
`;

const TableItem = ({
  children,
  ...props
}) => (
  <Item className='table-item' {...props}>
    {children}
  </Item>
);

TableItem.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  TableItem
);
