const Styled = require('styled-components');
const constants = require('../../shared/constants');

const {
  colors
} = constants;

const {
  css
} = Styled;

module.export = {
  libreFranklin: css`
    font-family: 'LibreFranklin', Helvetica, sans-serif;
  `,
  bold: css`
    font-weight: 600;
  `,
  regular: css`
    font-weight: normal;
  `,
  titleColor: css`
    color: ${colors.base.secondary};
  `,
  bodyColor: css`
    color: ${colors.base.text};
  `,
};
