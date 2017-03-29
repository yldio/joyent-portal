import styled, { css } from 'styled-components';
import camelCase from 'camel-case';
import isString from 'lodash.isstring';
import { boxes, colors } from '../constants';
import { unitcalc, remcalc } from '../functions';

import {
  libreFranklin,
  semibold,
  medium,
  normal
} from './typography';

const sides = [
  'top',
  'right',
  'bottom',
  'left'
];

const unitProps = (() => {
  const sided = (rule) =>
    sides.map((side) => `${rule}-${side}`);

  const measures = [
    'margin',
    'padding'
  ].reduce((props, rule) => [
    ...props,
    rule,
    ...sided(rule)
  ], []);

  return sides.reduce((acc, side) => [
    ...acc,
    `border-${side}-width`
  ], [
    'border',
    ...measures
  ]);
})();

const unitsFromProps = (props) => unitProps
  .filter((measure) => props[camelCase(measure)])
  .map((measure) => `
    ${measure}: ${unitcalc(props[camelCase(measure)])};
  `)
  .join(';\n');

export const Baseline = (Component) => styled(Component)`
  ${unitsFromProps}
`;

export const verticallyAlignCenter = css`
  /* Need to place position:relative on parent */
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const clear = css`
  display: block;
  content: "";
  clear: both;
`;

export const moveZ = ({
  amount = 0,
  position = 'relative'
}) => css`
  position: ${position};
  z-index: ${amount};
`;

export const baseBox = ({
  radius = boxes.borderRadius,
  border = boxes.border.unchecked,
  shadow = boxes.bottomShaddow
} = {}) => css`
  border: ${border};
  border-radius: ${radius};
  box-shadow: ${shadow};
`;

export const getMeasurement = (measurement) =>
  isString(measurement) ? measurement :
    !isNaN(measurement) ? `${measurement}px`: 'auto';

export const absolutePosition = (
  positions = {}
) => css`
  position: absolute;
  top: ${getMeasurement(positions.top)};
  right: ${getMeasurement(positions.right)};
  bottom: ${getMeasurement(positions.bottom)};
  left: ${getMeasurement(positions.left)};
`;

export const pseudoEl = (
  positions = {}
) => css`
  content: "";
  ${absolutePosition(positions)};
`;

export const clearfix = css`
  &:before,
  &:after {
    content:"";
    display:table;
  }

  &:after {
    clear:both;
  }
`;

export const paperEffect = css`
   box-shadow:
    0 ${remcalc(8)} 0 ${remcalc(-5)} ${colors.base.background},
    0 ${remcalc(8)} ${remcalc(1)} ${remcalc(-4)} ${colors.base.grey},
    0 ${remcalc(16)} 0 ${remcalc(-10)} ${colors.base.background},
    0 ${remcalc(16)} ${remcalc(1)} ${remcalc(-9)} ${colors.base.grey};
  margin-bottom: ${remcalc(16)};
`;

export const typography = {
  libreFranklin,
  semibold,
  medium,
  normal
};
