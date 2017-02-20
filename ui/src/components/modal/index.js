import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

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

  background: ${colors.secondary};
  border: ${remcalc(1)} solid ${colors.secondaryHover};
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

const Modal = ({
  children,
  handleDismiss,
  active,
  ...props
}) => !active ? null : (
  <div>
    <StyledOverlay
      aria-label='overlay'
      onClick={handleDismiss}
      role='link'
      tabIndex={-2}
    />
    <StyledModal {...props}>
      {children}
    </StyledModal>
  </div>
);

Modal.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  handleDismiss: React.PropTypes.func
};

export default Baseline(
  Modal
);
