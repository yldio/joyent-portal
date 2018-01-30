import React, { Component } from 'react';
import scrollToElement from 'scroll-to-element';

const ANIMATION_TIME = 400;

function slideDown(el, timing) {
  const { style } = el;
  const INITIAL = 'initial';
  const HIDDEN = 'hidden';
  timing = timing || `${ANIMATION_TIME}ms ease-out`;

  // Get element height
  style.transition = INITIAL;
  style.visibility = HIDDEN;
  style.maxHeight = INITIAL;
  const height = el.offsetHeight + 'px';
  style.removeProperty('visibility');
  style.maxHeight = '0';
  style.overflow = HIDDEN;

  // Begin transition
  style.transition = `max-height ${timing}, opacity ${timing}`;

  requestAnimationFrame(() => {
    style.maxHeight = height;
    style.opacity = '1';
  });

  window.setTimeout(() => {
    style.removeProperty('overflow');
    style.removeProperty('max-height');
  }, 300);
}

const Animated = WrappedComponent =>
  class Animated extends Component {
    componentDidUpdate() {
      const { match, step } = this.props;
      if (match.params.step === step) {
        slideDown(this.wrapper);
        scrollToElement(this.wrapper, {
          offset: -50
        });
      }
    }

    render() {
      return (
        <div
          ref={w => {
            this.wrapper = w;
          }}
        >
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
export default Animated;
