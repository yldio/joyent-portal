import TableContent from './table-content';
import { Baseline } from '../../shared/composers';
import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h3`
  text-align: center
`;

const StyledTableWrapper = styled.section`
  font-family: 'LibreFranklin', sans-serif;
  font-style: normal;
`;

const Table = ({
  children,
  columns = [],
  data = [],
  title,
  ...props
}) => (
  <StyledTableWrapper {...props}>
    <StyledTitle>{title || children}</StyledTitle>
    <TableContent
      columns={columns}
      data={data}
    />
  </StyledTableWrapper>
);

Table.propTypes = {
  children: React.PropTypes.node,
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  title: React.PropTypes.string
};

export default Baseline(
  Table
);
