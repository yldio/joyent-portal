const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const composers = require('../../shared/composers');

const CloseIcon = require(
  '!babel-loader!svg-react-loader!./close.svg?name=CloseIcon'
);

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  colors
} = constants;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  margin: 0;
  padding: ${remcalc(18)} ${remcalc(24)};
  float: right;
  background-color: ${colors.base.primaryDesaturated};
  line-height: 1.5;
  border: none;
  border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturated};
  cursor: pointer;
`;

const StyledIcon = styled(CloseIcon)`
  fill: ${colors.base.white};
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

module.exports = Baseline(
  AddMetricButton
);
