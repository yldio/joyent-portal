const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const Item = styled.div`
  display: inline-block;
  float: left;
`;

const TableItem = ({
  children
}) => {

  return (
    <Item className="table-item">
      {children}
    </Item>
  );
};

TableItem.propTypes = {
  children: React.PropTypes.node
};

module.exports = TableItem;