const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const Button = require('../button');
const SettingsIcon =
  require(
    '!babel-loader!svg-react-loader!./icon-settings.svg?name=SettingsIcon'
  );

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
  color: ${colors.base.primary};
  float: right;
  background-color: ${colors.base.primaryLight};
  line-height: 1.5;
  border: none;
  border-left: solid ${remcalc(1)} ${colors.base.primaryDark};

  &:hover,
  &:focus,
  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${colors.base.primaryLight};
    border: none;
    border-left: solid ${remcalc(1)} ${colors.base.primaryDark};
  }
`;

const StyledIcon = styled(SettingsIcon)`
  fill: ${colors.base.primary};
  margin-right: ${remcalc(12)};
`;

const AddMetricButton = ({
  children,
  metric,
  onClick
}) => {
  const onButtonClick = (e) => onClick(metric);
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
  metric: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

module.exports = AddMetricButton;
