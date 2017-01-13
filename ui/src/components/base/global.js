const Styled = require('styled-components');
const fncs = require('../../shared/functions');

const {
  generateFonts
} = fncs;

const {
  css
} = Styled;

// The name that will be used in the 'font-family' property
const fontFamilies = [
  'LibreFranklin'
];

// The name the font file without the extension
const fontFilenames = [
  'librefranklin-webfont'
];

module.exports = css`
  ${generateFonts(fontFamilies, fontFilenames)}

  html, body {
    font-size: 16px;
    margin: 0;
  }
`;
