const React = require('react');
const Styled = require('styled-components');

const fns = require('../../shared/functions');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const StyledButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: ${remcalc(16)};
  right: ${remcalc(16)};
  
  ${props => props.styles}
`;

const Close = ({
  style,
  onClick,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      styles={style}
    >
      <img
        alt="Close"
        src="./close.svg"
      />
    </StyledButton>
  );
};

Close.propTypes = {
  onClick: React.PropTypes.func,
  style: React.PropTypes.object
};

module.exports = Close;
