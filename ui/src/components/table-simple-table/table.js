const React = require('react');
const Styled = require('styled-components');

const constants = require('../../shared/constants');
const composers = require('../../shared/composers');

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const {
  Baseline
} = composers;

const StyledTableWrapper = styled.section`
  border: solid 1px ${colors.base.grey}
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
`;

const Table = ({
  children,
  style,
  title
}) => (
  <StyledTableWrapper style={style}>
    {children}
  </StyledTableWrapper>
);

Table.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  title: React.PropTypes.string,
};

module.exports = Baseline(
  Table
);
