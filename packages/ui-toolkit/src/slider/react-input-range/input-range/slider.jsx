import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from './label';

import styled from 'styled-components';
import remcalc from 'remcalc';
import theme from '../../../theme';

export const SliderStyled = styled.div`
  appearance: none;
  background: ${theme.white};
  border: ${remcalc(2)} solid ${theme.grey};
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: ${remcalc(14)};
  width: ${remcalc(14)};
  transform: translateY(-50%);
  outline: none;
  position: absolute;
  top: 0;
  margin-top: ${remcalc(2)};

  &::active {
    transform: scale(1.3);
  }

  &::focus {
    box-shadow: 0 0 0 ${remcalc(5)} rgba(63, 81, 181, 0.2);
  }
`;

/**
 * @ignore
 */
export default class Slider extends Component {
  /**
   * Accepted propTypes of Slider
   * @override
   * @return {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} className
   * @property {Function} formatLabel
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} onSliderDrag
   * @property {Function} onSliderKeyDown
   * @property {Function} percentage
   * @property {Function} type
   * @property {Function} value
   */
  static get propTypes() {
    return {
      ariaLabelledby: PropTypes.string,
      ariaControls: PropTypes.string,
      classNames: PropTypes.objectOf(PropTypes.string),
      formatLabel: PropTypes.func,
      maxValue: PropTypes.number,
      minValue: PropTypes.number,
      onSliderDrag: PropTypes.func,
      onSliderKeyDown: PropTypes.func,
      percentage: PropTypes.number,
      type: PropTypes.string,
      value: PropTypes.number
    };
  }

  /**
   * @param {Object} props
   * @param {string} [props.ariaLabelledby]
   * @param {string} [props.ariaControls]
   * @param {InputRangeClassNames} props.classNames
   * @param {Function} [props.formatLabel]
   * @param {number} [props.maxValue]
   * @param {number} [props.minValue]
   * @param {Function} props.onSliderKeyDown
   * @param {Function} props.onSliderDrag
   * @param {number} props.percentage
   * @param {number} props.type
   * @param {number} props.value
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */
  componentWillUnmount() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
    this.removeDocumentTouchMoveListener();
  }

  /**
   * @private
   * @return {Object}
   */
  getStyle() {
    const percentage = (this.props.percentage || 0) * 100;
    const style = {
      position: 'absolute',
      left: `${percentage > 94 ? 94 : percentage}%`,
    };

    return style;
  }

  /**
   * Listen to mousemove event
   * @private
   * @return {void}
   */
  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * Listen to mouseup event
   * @private
   * @return {void}
   */
  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Listen to touchmove event
   * @private
   * @return {void}
   */
  addDocumentTouchMoveListener() {
    this.removeDocumentTouchMoveListener();
    this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
  }

  /**
   * Listen to touchend event
   * @private
   * @return {void}
   */
  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener(
      'mousemove',
      this.handleMouseMove
    );
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseUpListener() {
    this.node &&
      this.node.ownerDocument.removeEventListener(
        'mouseup',
        this.handleMouseUp
      );
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentTouchMoveListener() {
    this.node.ownerDocument.removeEventListener(
      'touchmove',
      this.handleTouchMove
    );
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener(
      'touchend',
      this.handleTouchEnd
    );
  }

  /**
   * @private
   * @return {void}
   */
  handleMouseDown() {
    this.addDocumentMouseMoveListener();
    this.addDocumentMouseUpListener();
  }

  /**
   * @private
   * @return {void}
   */
  handleMouseUp() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  handleMouseMove(event) {
    this.props.onSliderDrag(event, this.props.type);
  }

  /**
   * @private
   * @return {void}
   */
  handleTouchStart() {
    this.addDocumentTouchEndListener();
    this.addDocumentTouchMoveListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  handleTouchMove(event) {
    this.props.onSliderDrag(event, this.props.type);
  }

  /**
   * @private
   * @return {void}
   */
  handleTouchEnd() {
    this.removeDocumentTouchMoveListener();
    this.removeDocumentTouchEndListener();
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this.props.type);
  }

  /**
   * @override
   * @return {JSX.Element}
   */
  render() {
    const style = this.getStyle();
    const props = this.props;

    return (
      <span
        ref={node => {
          this.node = node;
        }}
      >
        <Label
          greyed={props.greyed}
          formatLabel={props.formatLabel}
          type={props.type}
        >
          {props.value}
        </Label>
        <SliderStyled
          type={props.type}
          percentage={props.percentage}
          style={style}
          aria-labelledby={props.ariaLabelledby}
          aria-controls={props.ariaControls}
          aria-valuemax={props.maxValue}
          aria-valuemin={props.minValue}
          aria-valuenow={props.value}
          draggable="false"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          role="slider"
          tabIndex="0"
        />
      </span>
    );
  }
}
