const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const View = require('./view').raw;
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

module.exports = styled(View)`
  display: block;
  padding-top: ${remcalc(62)};
  padding-left: ${remcalc(23)};
  padding-right: ${remcalc(23)};
  padding-bottom: ${remcalc(5)};
  background-color: ${colors.brandInactive};
`;
