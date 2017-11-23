import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import disableScroll from 'disable-scroll';
import remcalc from 'remcalc';
import { modalShadow } from '../boxes';
import CloseButton from '../close-button';
import P from '../text/p';
import { H2 } from '../text/headings';

const StyledBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(250, 250, 250, 0.5);
  z-index: 100;
`;

const StyledModal = styled.div`
  position: absolute;
  left: 50%;
  top: 33.33%;
  padding: ${remcalc(36)} ${remcalc(36)} ${remcalc(36)} ${remcalc(36)};
  background-color: ${props => props.theme.white};
  box-shadow: ${modalShadow};

  width: ${props => remcalc(props.width)};
  margin: 0 auto 0 -${props => remcalc(props.width / 2)};
  z-index: 101;
`;

// tmp
const StyledClose = styled(CloseButton)`
  position: absolute;
  right: ${remcalc(6)};
  top: ${remcalc(3)};
`;

class Modal extends Component {
  componentDidMount() {
    // disableScroll.on();
  }

  componentWillUnmount() {
    // disableScroll.off();
  }

  render() {
    const { children, width, onCloseClick } = this.props;

    return (
      <StyledBackground>
        <StyledModal width={width}>
          <StyledClose onClick={onCloseClick}>X</StyledClose>
          {children}
        </StyledModal>
      </StyledBackground>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  onCloseClick: PropTypes.func
};

export default Modal;

export const ModalHeading = styled(H2)`
  line-height: 1.25;
  color: ${props => props.theme.secondary};
  margin: 0 0 ${remcalc(12)} 0;
`;

export const ModalText = styled(P)`
  color: ${props => props.theme.secondary};
  margin: ${remcalc(12)} 0 ${remcalc(30)} 0;
`;
