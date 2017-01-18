const fns = require('../../shared/functions');

const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const StyledModal = styled.div`
  max-width: 80%;
  min-width: 50%;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  padding: ${remcalc(20)};
  z-index: 1;

  background: ${colors.brandSecondary};
  border: ${remcalc(1)} solid ${colors.borderSecondary};
`;

const StyledOverlay = styled.div`
  background: rgba(74, 73, 74, 0.46);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const Modal = (props) => {
  if (!props.active) {
    return null;
  }

  return (
    <div>
      <StyledOverlay
        aria-label='overlay'
        onClick={props.handleDismiss}
        role='link'
        tabIndex={-2}
      />
      <StyledModal {...props}>
        {props.children}
      </StyledModal>
    </div>
  );
};

Modal.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  handleDismiss: React.PropTypes.func
};

module.exports = Modal;
