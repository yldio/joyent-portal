import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import { Manager } from 'react-popper';
import PropTypes from 'prop-types';
import values from 'lodash.values';
import assign from 'lodash.assign';
import outy from 'outy';

export default class Container extends Component {
  static childContextTypes = {
    ttpContMangr: PropTypes.object.isRequired
  };

  getChildContext = () => ({
    ttpContMangr: {
      setRef: this._ref,
      handleTargetClick: this._handleTargetClick,
      handleTargetMouseEnter: this._handleTargetMouseEnter,
      handleTargetMouseLeave: this._handleTargetMouseLeave,
      isOpen: this._isOpen,
      hoverable: () => Boolean(this.props.hoverable),
      clickable: () => Boolean(this.props.clickable)
    }
  });

  _refs = {};

  state = {
    isOpen: false
  };

  _ref = name => c =>
    assign(this._refs, {
      [name]: findDOMNode(c)
    });

  componentDidMount = () => {
    this._setOusideTap();
  };

  componentDidUpdate = (lastProps, { isOpen: wasOpen }) => {
    const { isOpen } = this.state;

    if (wasOpen !== isOpen) {
      setTimeout(() => this._setOusideTap());
    }
  };

  componentWillUnmount = () => this._removeOutsideTap();

  _setOusideTap = () => {
    const elements = values(this._refs);

    this._removeOutsideTap();

    if (!elements.length) {
      return;
    }

    this.outsideTap = outy(
      elements,
      ['click', 'touchstart'],
      this._handleOutsideTap
    );
  };

  _handleOutsideTap = ev =>
    this.state.isOpen && this.setState({ isOpen: false });

  _handleTargetClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    return this.setState({ isOpen: !this.state.isOpen });
  };

  _handleTargetMouseEnter = () =>
    !this.state.isOpen && this.setState({ isOpen: true });

  _handleTargetMouseLeave = () =>
    this.state.isOpen && this.setState({ isOpen: false });

  _removeOutsideTap = () => this.outsideTap && this.outsideTap.remove();

  _isOpen = () =>
    !this.props.hoverable && !this.props.clickable ? true : this.state.isOpen;

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  render = () => {
    const { children } = this.props;

    return <Manager tag={false}>{children}</Manager>;
  };
}
