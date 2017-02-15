const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');
const transferProps = require('../../shared/transfer-props');

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const paper = `
  0 ${remcalc(8)} 0 ${remcalc(-5)} ${colors.base.grey},
  0 ${remcalc(8)} ${remcalc(1)} ${remcalc(-4)} ${colors.base.greyDarker},
  0 ${remcalc(16)} 0 ${remcalc(-10)} ${colors.base.grey},
  0 ${remcalc(16)} ${remcalc(1)} ${remcalc(-9)} ${colors.base.greyDarker};
`;

const height = (props) => props.collapsed
  ? remcalc(48)
  : 'auto';

const minHeight = (props) => props.collapsed
  ? 'auto'
  : remcalc(126);

const shadow = (props) => props.stacked
  ? paper
  : props.flat
    ? 'none'
    : props.collapsed && props.headed
      ? boxes.bottomShaddowDarker
      : boxes.bottomShaddow;

const marginBottom = (props) => props.stacked
  ? remcalc(16)
  : remcalc(10);

const Item = styled(Row)`
  position: relative;

  height: ${height};
  min-height: ${minHeight};
  box-shadow: ${shadow};
  border: ${remcalc(1)} solid ${colors.base.greyDark};
  background-color: ${colors.base.white};
  margin-bottom: ${marginBottom};
`;

module.exports = Baseline(
  transferProps([
    'collapsed',
    'headed'
  ], (props) => (
    <Item name='list-item' {...props}>
      {props.children}
    </Item>
  ))
);

