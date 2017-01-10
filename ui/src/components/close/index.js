const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const composers = require('../../shared/composers');
const React = require('react');
const Styled = require('styled-components');
const closeIcon = require('../../shared/assets/close');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const Close = ({
  style,
  onClick
}) => {
  return (
    <StyledButton
      style={style}
      onClick={onClick}
    >
      <img src={closeIcon} alt="Close"/>
    </StyledButton>
  );
};

Close.propTypes = {
  style: React.PropTypes.object,
  onClick: React.PropTypes.func
};

module.exports = Close;
