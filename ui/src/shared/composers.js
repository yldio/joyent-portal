const constants = require('./constants');
const Styled = require('styled-components');

const {
  boxes
} = constants;

const {
  css
} = Styled;

module.exports = {
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
  `
};
