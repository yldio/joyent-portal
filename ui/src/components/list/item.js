const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');
const transferProps = require('./transfer-props');

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

const height = (props) => props.collapsed
  ? remcalc(48)
  : remcalc(126);

const shadow = (props) => props.collapsed && props.headed
  ? boxes.bottomShaddowDarker
  : boxes.bottomShaddow;

const Item = styled(Row)`
  position: relative;

  height: ${height}
  box-shadow: ${shadow};
  border: 1px solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
  margin-bottom: ${remcalc(10)};
`;

module.exports = transferProps([
  'collapsed',
  'headed'
], (props) => (
  <Item name='list-item' {...props}>
    {props.children}
  </Item>
));
