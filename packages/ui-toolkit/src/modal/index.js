import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import disableScroll from 'disable-scroll';
import remcalc from 'remcalc';
import theme from '../theme';
import { border, borderRadius, modalShadow } from '../boxes';
import Button from '../button';
import CloseButton from '../close-button';

const StyledBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(250, 250, 250, 0.5);
`;

const StyledModal = styled.div`
  position: absolute;
  left: 50%;
  top: 33.33%;
  padding: ${remcalc(30)} ${remcalc(36)} ${remcalc(36)} ${remcalc(36)};
  background-color: ${theme.white};
  box-shadow: ${modalShadow};

  width: ${props => remcalc(props.width)};
  margin: 0 auto 0 -${props => remcalc(props.width / 2)};
`;

// tmp
const StyledClose = styled(CloseButton)`
  position: absolute;
  right: ${remcalc(6)};
  top: ${remcalc(3)};
`;

class Modal extends Component {
  componentDidMount() {
    disableScroll.on();
  }

  componentWillUnmount() {
    disableScroll.off();
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
