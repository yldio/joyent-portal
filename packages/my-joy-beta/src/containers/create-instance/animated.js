import React, { Component } from 'react';
import scrollToElement from 'scroll-to-element';

function slideDown(el) {
  const { style } = el;
  const INITIAL = 'initial';
  const HIDDEN = 'hidden';

  // Get element height
  style.transition = INITIAL;
  style.visibility = HIDDEN;
  style.maxHeight = INITIAL;
  const offsetHeight = el.offsetHeight;
  const height = offsetHeight + 'px';
  style.removeProperty('visibility');
  style.maxHeight = '0';
  style.overflow = HIDDEN;

  const timing = `${parseInt(height, 10) * 1.9}ms linear`;

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

    shouldComponentUpdate = nextProps =>
      this.props.match.params.step !== nextProps.match.params.step;

    render() {
      return (
        <div
          ref={w => {
            this.wrapper = w;
          }}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
export default Animated;
