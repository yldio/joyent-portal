const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledModal = styled.div`
  background: white;
  display: block;
  left: 50%;
  margin: 0 auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const StyledClose = styled.button`
  background-color: #FFFFFF;
  border: solid 1px #D8D8D8;
  border-radius: 4px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  color: black;
  cursor: #000000;
  font-size: 20px;
  padding: 0 10px;
  position: absolute;
  right: -20px;
  text-align: center;
  text-decoration: none;
  top: -15px;
`;

const StyledOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
`;

const Modal = ({
  active = true,
  children,
  className,
  handleDismiss,
  name,
  style
}) => {
  if (!active) {
    return null;
  }

  return (
    <div className={className} style={style}>
      <StyledOverlay
        aria-label='overlay'
        role='link'
        tabIndex={-2}
      />
      <StyledModal aria-label={name}>
        <StyledClose
          onClick={handleDismiss}
          role='dialog'
          tabIndex={-1}
        >X</StyledClose>
        {children}
      </StyledModal>
    </div>
  );
};

Modal.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  handleDismiss: React.PropTypes.func,
  name: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Modal;
