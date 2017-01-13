const fns = require('../../shared/functions');

const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const Close = require('../close');

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
  background: ${colors.brandSecondary};
  display: block;
  left: 50%;
  margin: 0 auto;
  padding: ${remcalc(20)};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 80%;
  min-width: 50%;
`;

const StyledOverlay = styled.div`
  background: rgba(74, 73, 74, 0.46);
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
  customCloseStyle,
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
        <Close
          customStyles={customCloseStyle}
          onClick={handleDismiss}
        />
        {children}
      </StyledModal>
    </div>
  );
};

Modal.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  customCloseStyle: React.PropTypes.string,
  handleDismiss: React.PropTypes.func,
  name: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Modal;
