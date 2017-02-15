const composers = require('../../shared/composers');

const React = require('react');
const Styled = require('styled-components');

const {
  default: styled,
} = Styled;

const {
  clearfix,
  Baseline
} = composers;

const StyledTableBody = styled.article`
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);

  ${clearfix}
`;

const TableBody = ({
  children
}) => {
  const itemCount = children.length;

  if (itemCount <= 1) {
    return null;
  }

  return (
    <StyledTableBody itemCount={itemCount}>
      {children}
    </StyledTableBody>
  );
};

TableBody.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  StyledTableBody
);