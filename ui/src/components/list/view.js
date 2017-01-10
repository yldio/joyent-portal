const fns = require('../../shared/functions');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');
const transferProps = require('./transfer-props');

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

const StyledView = styled(Row)`
  flex: 1;
  margin: 0;
  height: 100%;
  padding-top: ${paddingTop};
  display: ${display};
`;

const View = (props) => (
  <StyledView name='list-item-view' {...props}>
    {props.children}
  </StyledView>
);

View.propTypes = {
  children: React.PropTypes.node
};

module.exports = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], View);

module.exports.raw = View;
