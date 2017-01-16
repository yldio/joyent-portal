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

const generateFonts = (fonts) => {
  const pathToFont = './fonts/';
  let fontCSS = '';

  fonts.forEach((obj) => {
    const eot = require(`${pathToFont + obj.filename}.eot`);
    const woff = require(`${pathToFont + obj.filename}.woff`);
    const woff2 = require(`${pathToFont + obj.filename}.woff2`);
    const ttf = require(`${pathToFont + obj.filename}.ttf`);
    const svg = require(`${pathToFont + obj.filename}.svg`);
    fontCSS += `
      @font-face {
        font-family: '${obj.family}';
        src: url('${eot}'),
          url('${eot}?#iefix')
               format('embedded-opentype'),
          url('${woff}')
               format('woff'),
          url('${woff2}')
               format('woff2'),
          url('${ttf}')
               format('truetype'),
          url('${svg}#${obj.family}')
               format('svg');
        font-weight: ${obj.weight};
        font-style: ${obj.style};
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
