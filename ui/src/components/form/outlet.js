const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  colors,
  boxes
} = constants;

const {
  remcalc
} = fns;

const {
  css
} = Styled;

const colorWithDisabled = (props) => props.disabled
  ? colors.inactive.default
  : colors.fonts.regular;

const colorWithDefaultValue = (props) => props.value === props.defaultValue
  ? colors.inactive.default
  : colorWithDisabled(props);

const color = (props) => props.defaultValue
  ? colorWithDefaultValue(props)
  : colorWithDisabled(props);

const border = (props) => props.error
  ? boxes.border.error
  : boxes.border.unchecked;

const height = (props) => !props.multiple
  ? remcalc(48)
  : 'auto';

const paddingTop = (props) => props.multiple
  ? remcalc(20)
  : remcalc(13);

const Outlet = css`
  box-sizing: border-box;

  width: 100%;
  height: ${height};

  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
  padding: ${paddingTop} ${remcalc(18)};

  border-radius: ${boxes.borderRadius};
  background-color: ${colors.base.white};
  box-shadow: ${boxes.insetShaddow};
  border: ${border};

  font-size: ${remcalc(16)};
  line-height: normal;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${color};

  appearance: none;
  outline: 0;

  &:focus {
    border-color: ${colors.base.primary};
    outline: 0;
  }
`;

module.exports = Outlet;
