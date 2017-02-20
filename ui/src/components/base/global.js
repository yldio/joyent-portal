const Styled = require('styled-components');
const fncs = require('../../shared/functions');

const {
  generateFonts
} = fncs;

const {
  css
} = Styled;

const fonts = [
  {
    family: 'LibreFranklin',
    filename: 'librefranklin-regular-webfont',
    weight: '400',
    style: 'normal'
  },
  {
    family: 'LibreFranklin-Semi-Bold',
    filename: 'librefranklin-semibold-webfont',
    weight: '600',
    style: 'normal'
  },
  {
    family: 'LibreFranklin-Bold',
    filename: 'librefranklin-bold-webfont',
    weight: '700',
    style: 'normal'
  },
];

module.exports = css`
  ${generateFonts(fonts)}

  html, body {
    font-size: 16px;
    margin: 0;
  }
`;
