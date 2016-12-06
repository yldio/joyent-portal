const Styled = require('styled-components');

const {
  css
} = Styled;

module.exports = {
  verticallyAlignCenter: css`
    /* Need to palce position:relative on parent */
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  clear: css`
    display: block;
    content: "";
    clear: both;
  `
};
