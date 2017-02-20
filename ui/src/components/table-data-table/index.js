const composers = require('../../shared/composers');
const React = require('react');
const Styled = require('styled-components');

const TableContent = require('./table-content');

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

const StyledTitle = styled.h3`
  text-align: center
`;

const StyledTableWrapper = styled.section`
  font-family: 'LibreFranklin', sans-serif;
  font-style: normal;
`;

const Table = ({
  children,
  className,
  columns = [],
  data = [],
  style,
  title
}) => (
  <StyledTableWrapper style={style} className={className}>
    <StyledTitle>{title}</StyledTitle>
    <TableContent
      columns={columns}
      data={data}
    />
  </StyledTableWrapper>
);

Table.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  columns: React.PropTypes.array,
  data: React.PropTypes.array,
  style: React.PropTypes.object,
  title: React.PropTypes.string
};

module.exports = Baseline(
  Table
);
