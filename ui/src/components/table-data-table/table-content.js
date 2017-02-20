import TableBody from './table-body';
import TableHeader from './table-head';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';
import React from 'react';

const StyledTable = styled.table`
  width: 100%;
`;

const TableContent = ({
  columns,
  data,
  hasHeader = columns.length >= 1,
  hasBody = data.length >= 1,
  ...props
}) => (
  <StyledTable {...props}>
    {hasHeader ? <TableHeader columns={columns} /> : null}
    {hasBody ? <TableBody columns={columns} data={data} /> : null}
  </StyledTable>
);

TableContent.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  hasBody: React.PropTypes.bool,
  hasHeader: React.PropTypes.bool
};

export default Baseline(
  TableContent
);
