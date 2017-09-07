import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';
import remcalc from 'remcalc';
import theme from '../theme';
import { border, borderRadius, tooltipShadow } from '../boxes';

const StyledContainer = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  bottom: ${props => props.bottoms};
  right: ${props => props.right};

  &:focus {
    outline: none;
  }
`;

const StyledInnerContainer = styled.div`
  position: relative;
  display: inline-block;
  top: ${remcalc(5)};
  left: -50%;
  margin: 0;
  padding: ${unitcalc(2)} 0;
  background-color: ${props =>
    props.secondary ? props.theme.secondary : props.theme.white};
  border: ${props => (props.secondary ? border.secondary : border.unchecked)};
  box-shadow: ${tooltipShadow};
  border-radius: ${borderRadius};
  z-index: 1000;

  &:after,
  &:before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    height: 0;
    width: 0;
    border: solid transparent;
  }

  &:after {
    border-bottom-color: ${props =>
      props.secondary ? props.theme.secondary : theme.white};
    border-width: ${remcalc(3)};
    margin-left: ${remcalc(-3)};
  }

  &:before {
    border-bottom-color: ${props =>
      props.secondary ? props.theme.secondaryActive : theme.grey};
    border-width: ${remcalc(5)};
    margin-left: ${remcalc(-5)};
  }
`;

/**
 * @example ./usage.md
 */
class Tooltip extends Component {
  componentDidMount() {
    this.windowClickHandler = this.handleWindowClick.bind(this);
    this.windowClickCounter = 0;
    window.addEventListener('click', this.windowClickHandler);
  }

  componentWillReceiveProps(nextProps) {
    this.windowClickCounter = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.windowClickHandler);
  }

  handleWindowClick(evt) {
    if (this.windowClickCounter) {
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }
    this.windowClickCounter++;
  }

  render() {
    let {
      children,
      top = 'auto',
      left = 'auto',
      bottom = 'auto',
      right = 'auto',
      secondary
    } = this.props;

    if (typeof top === 'number') {
      top = `${top}px`;
    }
    if (typeof left === 'number') {
      left = `${left}px`;
    }
    if (typeof bottom === 'number') {
      bottom = `${bottom}px`;
    }
    if (typeof right === 'number') {
      right = `${right}px`;
    }

    return (
      <StyledContainer top={top} left={left} bottom={bottom} right={right}>
        <StyledInnerContainer secondary={secondary}>
          {children}
        </StyledInnerContainer>
      </StyledContainer>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
  onBlur: PropTypes.func,
  secondary: PropTypes.boolean
};

export default Tooltip;
