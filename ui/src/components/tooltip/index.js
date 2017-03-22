import { remcalc, unitcalc } from '../../shared/functions';
import { boxes, colors } from '../../shared/constants';
import styled from 'styled-components';
import React, { Component } from 'react';

import {
  absolutePosition,
  baseBox,
  pseudoEl,
  Baseline,
  moveZ,
  getMeasurement
} from '../../shared/composers';

const StyledContainer = styled.div`
  ${(props) => absolutePosition(props)}

  &:focus {
    outline: none;
  }
`;

const StyledList = styled.ul`
  background: ${colors.base.white};
  box-sizing: border-box;
  color: ${colors.base.text};
  display: inline-block;
  font-family: sans-serif;
  list-style-type: none;
  margin: 0;
  padding: ${unitcalc(2)} 0;

  position: absolute;
  top: ${remcalc(4)};

  ${(props) => {
    return props.arrowPosition.left ?
      `left: -${getMeasurement(props.arrowPosition.left)}` :
      props.arrowPosition.right ?
      `right: -${getMeasurement(props.arrowPosition.right)}` : null;
  }};

  ${props => props.styles}

  ${baseBox({
    shadow: boxes.tooltipShadow
  })}

  ${moveZ({
    amount: 1
  })}

  &:after, &:before {
    border: solid transparent;
    height: 0;
    width: 0;

    ${ props => pseudoEl(props.arrowPosition) }
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: ${colors.base.white};
    border-width: ${remcalc(3)};
    margin-left: ${remcalc(-3)};
  }

  &:before {
    border-color: rgba(216, 216, 216, 0);
    border-bottom-color: ${colors.base.grey};
    border-width: ${remcalc(5)};
    margin-left: ${remcalc(-5)};
  }
`;

class Tooltip extends Component {
  componentDidMount() {
    this._refs.ul.focus();
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }

  render() {
    const {
      children,
      arrowPosition = {
        bottom: '100%',
        left: '50%'
      },
      ...rest
    } = this.props;

    return (
      <StyledContainer
        innerRef={this.ref('ul')}
        tabIndex={-1}
        {...rest}
      >
        <StyledList arrowPosition={arrowPosition} {...rest}>
          {children}
        </StyledList>
      </StyledContainer>
    );
  }
}

Tooltip.propTypes = {
  arrowPosition: React.PropTypes.object,
  children: React.PropTypes.node
};

export default Baseline(
  Tooltip
);

export { default as TooltipButton } from './button';

export const TooltipDivider = styled.div`
  border-top: ${boxes.border.unchecked};
  margin: ${unitcalc(1)} 0 ${unitcalc(1.5)} 0;
`;
