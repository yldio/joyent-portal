const fns = require('../../shared/functions');
const composers = require('../../shared/composers');

const React = require('react');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

const {
  clearfix
} = composers;

const StyledTableHead = styled.header`
  background: #fafafa;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  padding: ${remcalc(24)} 0;
  
  ${clearfix}
  
  & > .table-item {
    text-align: center;
    
    ${props => {
      const width = 100 / props.itemCount;
      return css`
        width: ${width}%;  
      `;
    }}
  }
`;

const TableHead = ({
  children
}) => {

  const itemCount = children.length;

  if (itemCount <= 1) return;

  return (
    <StyledTableHead itemCount={itemCount}>
      {children}
    </StyledTableHead>
  );
};

TableHead.propTypes = {
  children: React.PropTypes.node
};

module.exports = TableHead;