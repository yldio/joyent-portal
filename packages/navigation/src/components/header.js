import { findDOMNode } from 'react-dom';
import React, { PureComponent } from 'react';
import emotion from 'preact-emotion';
import remcalc from 'remcalc';
import outy from 'outy';

import { breakpoints } from 'joyent-ui-toolkit/dist/es/breakpoints/screens';

export const Item = emotion('div')`
  order: 0;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;

  padding: ${remcalc(12)} ${remcalc(18)};
  cursor: pointer;
  height: ${remcalc(24)};

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;

  ${props =>
    props.active &&
    `
    height: ${remcalc(27)};
    border-bottom: ${remcalc(3)} solid #E38200;
    background-color: rgba(0, 0, 0, 0.25);
  `};
`;

export const FlexibleSpace = emotion(Item)`
  flex-grow: 1;

  &:hover {
    background-color: transparent;
  }
`;

export const Content = emotion('div')`
  flex: 1 1 auto;
  align-self: center;
  display: flex;

  font-size: ${remcalc(15)};
  line-height: ${remcalc(24)};
  font-weight: ${props => props.theme.font.weight.semibold};
  color: ${props => props.theme.white};

  @media (max-width: ${remcalc(breakpoints.small.upper)}) {
    display: none;
  }
`;

export const SubContent = emotion('span')`
  font-size: ${remcalc(15)};
  line-height: ${remcalc(24)};
  font-weight: ${props => props.theme.font.weight.normal};
  color: rgba(255, 255, 255, 0.5);
`;

export const Icon = emotion('div')`
  display: flex;
  flex: 0 0 auto;
  align-self: auto;
  justify-content: center;
  align-items: center;

  ${props =>
    !props.marginless &&
    `
    margin-left: ${remcalc(6)};
  `};
`;

export const Divider = emotion('div')`
  order: 0;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;

  background-color: black;
  flex: 0 1 ${remcalc(1)};
  height: ${remcalc(36)};
`;

export const Space = emotion('div')`
  width: ${remcalc(6)};
`;

export const Row = emotion('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${remcalc(48)};

  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

const Header = emotion('header')`
  background-color: #1e313b;

  width: 100%;
  height: ${remcalc(48)};
`;

export default class extends PureComponent {
  _refs = {};

  _ref = name => c => {
    Object.assign(this._refs, { [name]: findDOMNode(c) });
  };

  _removeOutsideTap = () => {
    return this.outsideTap && this.outsideTap.remove();
  };

  _setOusideTap = () => {
    if (!this.props.onOutsideClick) {
      return;
    }

    const elements = Object.values(this._refs);

    this._removeOutsideTap();

    if (!elements.length) {
      return;
    }

    this.outsideTap = outy(
      elements,
      ['click', 'touchend'],
      this.props.onOutsideClick
    );
  };

  componentDidMount = () => {
    this._setOusideTap();
  };

  componentDidUpdate = () => {
    this._setOusideTap();
  };

  componentWillUnmount = () => {
    this._removeOutsideTap();
  };

  render() {
    const { children, ...props } = this.props;

    return (
      <Header {...props} innerRef={this._ref('overlay')}>
        {children}
      </Header>
    );
  }
}
