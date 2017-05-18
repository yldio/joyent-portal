const randomNatural = require('random-natural');

// From https://github.com/styled-components/styled-components/blob/065001c725744629c7870240e4a955b924ef5337/src/utils/generateAlphabeticName.js
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const rndId = _code => {
  const code = _code ? _code : randomNatural({ min: 1000000000 });
  const lastDigit = chars[code % chars.length];

  return code > chars.length
    ? `${rndId(Math.floor(code / chars.length))}${lastDigit}`
    : lastDigit;
};

module.exports = rndId;
