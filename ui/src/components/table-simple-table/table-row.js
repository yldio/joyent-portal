const fns = require('../../shared/functions');
const composers = require('../../shared/composers');

const React = require('react');
const Styled = require('styled-components');

const {
  default: styled,
  css
} = Styled;

const {
  clearfix
} = composers;

const {
  remcalc
} = fns;

const StyledTableRow = styled.div`
  ${clearfix}
  
  padding: ${remcalc(24)} 0;
  border-bottom: solid 1px #d8d8d8;
  
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

const TableRow = ({
  children
}) => {
  const itemCount = children.length;

  return (
    <StyledTableRow itemCount={itemCount}>
      {children}
    </StyledTableRow>
  );
};

TableRow.propTypes = {
  children: React.PropTypes.node
};

module.exports = TableRow;