const calc = require('reduce-css-calc');
const randomNatural = require('random-natural');

const pathToFont = './fonts/';
const remBase = 16;
const unitBase = 6;

// from https://github.com/styled-components/styled-components/blob/065001c725744629c7870240e4a955b924ef5337/src/utils/generateAlphabeticName.js
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const rndId = (_code) => {
  const code = !_code ? randomNatural({
    min: 1000000000
  }) : _code;

  const lastDigit = chars[code % chars.length];
  return code > chars.length
    ? `${rndId(Math.floor(code / chars.length))}${lastDigit}`
    : lastDigit;
};

const remcalc = (...values) => values.map((value) => (
  `${String(value).replace('px', '') / remBase}rem`
)).join(' ');

const unitcalc = (...values) => values.map(
  (value) => remcalc(value * unitBase)
);

const generateFonts = (fonts) => fonts.reduce((sum, {
  filename,
  family,
  style,
  weight
}) => {
  const eot = require(`${pathToFont + filename}.eot`);
  const woff = require(`${pathToFont + filename}.woff`);
  const woff2 = require(`${pathToFont + filename}.woff2`);
  const ttf = require(`${pathToFont + filename}.ttf`);
  const svg = require(`${pathToFont + filename}.svg`);

  sum += `
    @font-face {
      font-family: '${family}';
      src: url('${eot}'),
        url('${eot}?#iefix')
             format('embedded-opentype'),
        url('${woff}')
             format('woff'),
        url('${woff2}')
             format('woff2'),
        url('${ttf}')
             format('truetype'),
        url('${svg}#${family}')
             format('svg');
      font-weight: ${weight};
      font-style: ${style};
    }
  `;

  return sum;
});

module.exports = {
  unitcalc: unitcalc,
  remcalc: remcalc,
  calc: (str) => calc(`calc(${str})`),
  rndId,
  generateFonts
};
