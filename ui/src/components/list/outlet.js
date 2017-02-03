const Column = require('../column');
const Styled = require('styled-components');
const React = require('react');

const {
  default: styled
} = Styled;

const display = (props) => props.collapsed
  ? 'none'
  : 'block';

const StyledColumn = styled(Column)`
  display: ${display}
`;

const Outlet = (props) => (
  <StyledColumn
    md={6}
    name='list-item-outlet'
    xs={12}
    {...props}
  >
    {props.children}
  </StyledColumn>
);

Outlet.propTypes = {
  children: React.PropTypes.node
};

module.exports = Outlet;
