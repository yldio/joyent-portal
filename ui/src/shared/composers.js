const Styled = require('styled-components');
const camelCase = require('camel-case');

const constants = require('./constants');
const fns = require('./functions');

const {
  boxes
} = constants;

const {
  unitcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

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

module.exports = {
  Baseline: (Component) => styled(Component)`
    ${unitsFromProps}
  `,
  verticallyAlignCenter: css`
    /* Need to place position:relative on parent */
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  clear: css`
    display: block;
    content: "";
    clear: both;
  `,
  moveZ: ({
    amount = 0,
    position = 'relative'
  }) => css`
    position: ${position};
    z-index: ${amount};
  `,
  baseBox: ({
    radius = boxes.borderRadius,
    border = boxes.border.unchecked,
    shadow = boxes.bottomShaddow
  } = {}) => css`
    border: ${border};
    border-radius: ${radius};
    box-shadow: ${shadow};
  `,
  pseudoEl: (
    positions = {}
  ) => css`
    content: "";
    position: absolute;
    top: ${positions.top || 'auto'};
    right: ${positions.right || 'auto'};
    bottom: ${positions.bottom || 'auto'};
    left: ${positions.left || 'auto'};
  `,
  clearfix: css`
    &:before,
    &:after {
      content:"";
      display:table;
    }

    &:after {
      clear:both;
    }
  `
};
