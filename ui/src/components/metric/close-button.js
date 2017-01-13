const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const CloseIcon = require('!babel!svg-react!./close.svg?name=CloseIcon');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const {
  colors
} = constants;

const StyledButton = styled.button`
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
  cursor: pointer;
`;

const StyledIcon = styled(CloseIcon)`
  fill: ${colors.brandPrimaryColor};
`;

const AddMetricButton = ({
  onClick
}) => {

  const onButtonClick = (e) => onClick();
  return (
    <StyledButton
      name='close-button'
      onClick={onButtonClick}
    >
      <StyledIcon />
    </StyledButton>
  );
};

AddMetricButton.propTypes = {
  onClick: React.PropTypes.func,
};

module.exports = AddMetricButton;
