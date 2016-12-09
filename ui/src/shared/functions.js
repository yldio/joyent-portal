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
  rndId
};
