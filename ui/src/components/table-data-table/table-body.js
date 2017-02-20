import Row from './table-row';
import { Baseline } from '../../shared/composers';
import React from 'react';

const TableBody = ({
  columns,
  data,
  ...props
}) => {
  const rows = columns.map((column, index) => (
    <Row dataItem={data[index]} key={index} />
  ));

  return (
    <tbody {...props}>
      {rows}
    </tbody>
  );
};

TableBody.propTypes = {
  columns: React.PropTypes.array,
  data: React.PropTypes.array
};

export default Baseline(
  TableBody
);
