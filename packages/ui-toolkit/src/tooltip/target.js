import React, { Component } from 'react';
import { Target as BaseTarget } from 'react-popper';
import PropTypes from 'prop-types';

export default class Target extends Component {
  static contextTypes = {
    ttpContMangr: PropTypes.object.isRequired
  };

  render = () => {
    const { children, ...rest } = this.props;

    const {
      setRef,
      handleTargetClick,
      handleTargetMouseEnter,
      handleTargetMouseLeave,
      hoverable,
      clickable
    } = this.context.ttpContMangr;

    const onMouseEnter =
      hoverable() && handleTargetMouseEnter
        ? handleTargetMouseEnter
        : undefined;

    const onMouseLeave =
      hoverable() && handleTargetMouseLeave
        ? handleTargetMouseLeave
        : undefined;

    const onClick =
      clickable() && handleTargetClick ? handleTargetClick : undefined;

    return (
      <BaseTarget
        innerRef={setRef('target')}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {children}
      </BaseTarget>
    );
  };
}
