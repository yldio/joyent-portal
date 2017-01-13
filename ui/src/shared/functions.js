const calc = require('reduce-css-calc');
const randomNatural = require('random-natural');

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

const generateFonts = (fontFamilies, fontFilenames) => {
  const pathToFont = './fonts/';
  let fontCSS = '';

  fontFamilies.forEach( (fontFamily, i) => {
    const eot = require(`${pathToFont + fontFilenames[i]}.eot`);
    const woff = require(`${pathToFont + fontFilenames[i]}.woff`);
    const woff2 = require(`${pathToFont + fontFilenames[i]}.woff2`);
    const ttf = require(`${pathToFont + fontFilenames[i]}.ttf`);
    const svg = require(`${pathToFont + fontFilenames[i]}.svg`);
    fontCSS += `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${eot}'),
          url('${eot}?#iefix')
               format('embedded-opentype'),
          url('${woff}')
               format('woff'),
          url('${woff2}')
               format('woff2'),
          url('${ttf}')
               format('truetype'),
          url('${svg}#${fontFamily}')
               format('svg')
        font-weight: normal;
        font-style: normal;
      }
    `;
  });
  return fontCSS;
};

module.exports = {
  remcalc: (values) => {
    values = values.toString().replace('px', '').split(' ');

    let outputRems = '';
    const base = 16;

    values.forEach( (value, i) => {
      const remValue = value / base;
      outputRems += i === 0 ? `${remValue}rem` : ` ${remValue}rem`;
    });

    return outputRems;
  },
  calc: (str) => calc(`calc(${str})`),
  rndId,
  generateFonts
};
