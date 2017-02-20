import { remcalc } from '../../shared/functions';
import { breakpoints, colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';
import React from 'react';

const StyledTableHeadItem = styled.td`
  border-bottom: none;
  padding: ${remcalc(24)};

  ${breakpoints.medium`
    ${props => `width: ${props.mdWidth}`};
  `};
`;

const StyledTableHead = styled.thead`
  background: #fafafa;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  border: solid ${remcalc(1)} ${colors.base.grey};

  ${breakpoints.smallOnly`
    display: none;
  `};
`;

const TableHeader = ({
  columns,
  ...props
}) => {
  const fallBackWidth = `${100 / Number(columns.length)}%`;

  const titles = columns.map((column, i) => (
    <StyledTableHeadItem
      key={i}
      mdWidth={column.width || fallBackWidth}
    >
      {column.title}
    </StyledTableHeadItem>
  ));

  return (
    <StyledTableHead {...props}>
      <tr>
        {titles}
      </tr>
    </StyledTableHead>
  );
};

TableHeader.propTypes = {
  columns: React.PropTypes.array
};

export default Baseline(
  TableHeader
);
