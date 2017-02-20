const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const Label = require('./label');
const match = require('../../shared/match');
const Styled = require('styled-components');

const {
  breakpoints,
  colors
} = constants;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const color = match.prop({
  warning: colors.inputWarning,
  error: colors.inputError
  //disabled: colors.brandInactiveColor
})('type');


const Msg = styled(Label)`
  color: ${color};

  ${breakpoints.medium`
    float: right;
    text-align: right;
  `}
`;

module.exports = Baseline(
  Msg
);
