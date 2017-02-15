const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const View = require('./view').raw;
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  Baseline
} = composers;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const GroupView = styled(View)`
  display: block;
  padding-top: ${remcalc(62)};
  padding-left: ${remcalc(23)};
  padding-right: ${remcalc(23)};
  padding-bottom: ${remcalc(5)};
  background-color: ${colors.inactive.default};
`;

module.exports = Baseline(
  GroupView
);