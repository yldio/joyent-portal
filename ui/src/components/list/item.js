const Collapsed = require('./collapsed');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const height = (props) => props.collapsed ? remcalc(48) : remcalc(126);

const Item = styled(Row)`
  height: ${height}
  box-shadow: ${boxes.bottomShaddow};
  border: 1px solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
`;

module.exports = Collapsed((props) => (
  <Item name='list-item' {...props}>
    {props.children}
  </Item>
));
