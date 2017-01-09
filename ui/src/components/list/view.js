const fns = require('../../shared/functions');
const transferProps = require('./transfer-props');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const paddingTop = (props) => props.headed && !props.fromHeader
  ? remcalc(47)
  : remcalc(0);

const display = (props) => props.headed && !props.fromHeader && props.collapsed
  ? 'none'
  : 'flex';

const View = styled(Row)`
  flex: 1;
  margin: 0;
  height: 100%;
  padding-top: ${paddingTop};
  display: ${display};
`;

module.exports = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], (props) => (
  <View name='list-item-view' {...props}>
    {props.children}
  </View>
));
