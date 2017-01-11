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

const height = (props) => props.collapsed
  ? remcalc(48)
  : 'auto';

const paddingTop = (props) => props.headed && !props.fromHeader
  ? remcalc(47)
  : remcalc(0);

const StyledView = styled(Row)`
  flex: 1;
  margin: 0;
  height: ${height};
  padding-top: ${paddingTop};
`;

const View = (props) => {
  const hide = props.headed && !props.fromHeader && props.collapsed;

  return hide ? null : (
    <StyledView name='list-item-view' {...props}>
      {props.children}
    </StyledView>
  );
};

View.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool,
  headed: React.PropTypes.bool
};

module.exports = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], View);

module.exports.raw = View;
