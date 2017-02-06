const React = require('react');
const Styled = require('styled-components');

const constants = require('../../shared/constants');

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const StyledTableWrapper = styled.section`
  border: solid 1px ${colors.base.greyDark}
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
`;

const Table = ({
  children,
  title,
}) => (
  <StyledTableWrapper>
    {children}
  </StyledTableWrapper>
);

Table.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
};

module.exports = Table;
