import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popper as BasePopper, Arrow } from 'react-popper';
import rndId from 'rnd-id';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';

import style from '../tooltip/style';
import { default as BaseTarget } from '../tooltip/target';

const arrowClassName = rndId();

const Popper = styled(BasePopper)`
  box-shadow: 0 ${remcalc(2)} ${remcalc(6)} rgba(0, 0, 0, 0.1);
  border: ${remcalc(1)} solid ${props => props.theme.grey};

  ${isNot('noPadding')`
    padding: ${remcalc(15)} ${remcalc(18)} ${remcalc(3)} ${remcalc(18)};
  `};

  ${style({
    background: 'white',
    color: 'text',
    border: 'grey',
    arrow: arrowClassName
  })};
`;

const StyledTarget = styled(BaseTarget)`
  ${is('box')`
    cursor: pointer;

    height: 100%;
    width: 100%;

    display: flex !important;
    justify-content: center;
    align-items: center;
  `};
`;

export const Target = ({ children, box = false, ...rest }) => (
  <StyledTarget box={box} tag={box ? 'div' : false} {...rest}>
    {children}
  </StyledTarget>
);

export default class Popover extends Component {
  static contextTypes = {
    ttpContMangr: PropTypes.object.isRequired
  };

  render = () => {
    const { children, placement = 'auto', ...rest } = this.props;
    const { isOpen, setRef } = this.context.ttpContMangr;

    return (
      isOpen() && (
        <Popper innerRef={setRef('popper')} placement={placement} {...rest}>
          {children}
          <Arrow>
            <span className={arrowClassName} />
          </Arrow>
        </Popper>
      )
    );
  };
}

export { default as Divider } from './divider';
export { default as Item } from './item';
export { default as Container } from '../tooltip/container';
