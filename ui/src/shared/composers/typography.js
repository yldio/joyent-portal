const Styled = require('styled-components');
const constants = require('../../shared/constants');

const {
  colors
} = constants;

const {
  css
} = Styled;

module.exports = {
  libreFranklin: `
    font-family: 'LibreFranklin', Helvetica, sans-serif;
  `,
  libreFranklinSemiBold: `
    font-family: 'LibreFranklin-Semi-Bold', Helvetica, sans-serif;
  `,
  libreFranklinBold: `
    font-family: 'LibreFranklin-Bold', Helvetica, sans-serif;
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
