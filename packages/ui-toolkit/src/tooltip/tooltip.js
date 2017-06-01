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

const StyledList = styled.ul`
  position: relative;
  display: inline-block;
  top: ${remcalc(5)};
  left: -50%;
  margin: 0;
  padding: ${unitcalc(2)} 0;
  list-style-type: none;
  background-color: ${theme.white};
  border: ${border.unchecked};
  box-shadow: ${tooltipShadow};
  border-radius: ${borderRadius};
  z-index: 1;

  &:after, &:before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    height: 0;
    width: 0;
    border: solid transparent;
  }

  &:after {
    border-bottom-color: ${theme.white};
    border-width: ${remcalc(3)};
    margin-left: ${remcalc(-3)};
  }

  &:before {
    border-bottom-color: ${theme.grey};
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
    const {
      children,
      top = 'auto',
      left = 'auto',
      bottom = 'auto',
      right = 'auto'
    } = this.props;

    return (
      <StyledContainer top={top} left={left} bottom={bottom} right={right}>
        <StyledList>
          {children}
        </StyledList>
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
  onBlur: PropTypes.func
};

export default Tooltip;
