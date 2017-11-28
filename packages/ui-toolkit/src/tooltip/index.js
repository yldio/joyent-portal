import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popper as BasePopper, Arrow } from 'react-popper';
import rndId from 'rnd-id';
import remcalc from 'remcalc';
import is from 'styled-is';

import style from './style';

const arrowClassName = rndId();

const Popper = styled(BasePopper)`
  padding: ${remcalc(13)} ${remcalc(18)};
  font-weight: normal;
  ${style({
    background: 'text',
    color: 'white',
    border: 'transparent',
    arrow: arrowClassName
  })};

  ${is('success')`
    ${style({
      background: 'green',
      color: 'white',
      border: 'transparent',
      arrow: arrowClassName
    })};
  `};
`;

export default class Tooltip extends Component {
  static propTypes = {
    // List of accepted placements to use as values of the `placement` option. Variations are interpreted easily if you think of them as the left to right written languages. Horizontally (`top` and `bottom`), `start` is left and `end` is right. Vertically (`left` and `right`), `start` is top and `end` is bottom.
    placement: PropTypes.oneOf([
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start'
    ])
  };

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

export { default as Container } from './container';
export { default as Target } from './target';
