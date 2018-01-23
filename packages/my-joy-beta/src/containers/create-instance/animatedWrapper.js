import React, { Component, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import is from 'styled-is';
import scrollToElement from 'scroll-to-element';
import ReactDOM from 'react-dom';

const ANIMATION_TIME = 200;

const Height = keyframes`
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
`;

const Animate = styled.div`
  ${is('active')`
    transform-origin: top;
    animation: ${Height} ${ANIMATION_TIME}ms cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-fill-mode: both;
  `};
`;

const findPos = obj => {
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return [curtop];
  }
};

const AnimatedWrapper = WrappedComponent =>
  class AnimatedWrapper extends Component {
    render() {
      return (
        <Animate active={this.props.match.params.step === this.props.step}>
          <WrappedComponent {...this.props} />
        </Animate>
      );
    }
  };
export default AnimatedWrapper;
