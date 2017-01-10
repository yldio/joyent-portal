const React = require('react');
const Styled = require('styled-components');
const closeIcon = require('../../shared/assets/close.png');

const {
  default: styled
} = Styled;

const StyledButton = styled.button`
  background: none;
  border: none;
`;

const Close = ({
  style,
  onClick
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={style}
    >
      <img
        alt="Close"
        src={closeIcon}
      />
    </StyledButton>
  );
};

Close.propTypes = {
  onClick: React.PropTypes.func,
  style: React.PropTypes.object
};

module.exports = Close;
