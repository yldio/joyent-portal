const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const Button = require('../button');
const SettingsIcon =
  require('!babel!svg-react!./icon-settings.svg?name=SettingsIcon');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const {
  colors
} = constants;

const StyledButton = styled(Button)`
  position: relative;
  display: flex;
  margin: 0;
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${colors.brandPrimaryColor};
  float: right;
  background-color: ${colors.brandPrimaryDark};
  line-height: 1.5;
  border: none;
  border-left: solid ${remcalc(1)} ${colors.brandPrimaryDarkest};

  &:hover,
  &:focus,
  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${colors.brandPrimaryDark};
    border: none;
    border-left: solid ${remcalc(1)} ${colors.brandPrimaryDarkest};
  }
`;

const StyledIcon = styled(SettingsIcon)`
  fill: ${colors.brandPrimaryColor};
  margin-right: ${remcalc(12)};
`;

const AddMetricButton = ({
  children,
  onClick
}) => {
  const onButtonClick = (e) => onClick();
  return (
    <StyledButton
      name='add-metric-button'
      onClick={onButtonClick}
    >
      <StyledIcon />
      {children}
    </StyledButton>
  );
};

AddMetricButton.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};

module.exports = AddMetricButton;
