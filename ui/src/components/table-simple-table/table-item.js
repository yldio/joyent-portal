const React = require('react');
const Styled = require('styled-components');

const composers = require('../../shared/composers');

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

const Item = styled.div`
  display: inline-block;
  float: left;
`;

const TableItem = ({
  children
}) => (
  <Item className="table-item">
    {children}
  </Item>
);

TableItem.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  TableItem
);
