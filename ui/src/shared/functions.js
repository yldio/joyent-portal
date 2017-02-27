import { css } from 'styled-components';
import calc from 'reduce-css-calc';
import randomNatural from 'random-natural';
import flatten from 'lodash.flatten';

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

const remcalc = (...values) => flatten(
  values.map((value) => String(value).split(/\s/img))
).map((value) => (
  `${value.replace('px', '') / remBase}rem`
)).join(' ');

const unitcalc = (...values) => flatten(
  values.map((value) => String(value).split(/\s/img))
).map((value) =>
  remcalc(Number(value) * unitBase)
);

const cssCalc = (str) => calc(`calc(${str})`);

const is = (prop) => (...args) => (props) => props[prop]
  ? css(...args)
  : css``;

export {
  unitcalc,
  remcalc,
  cssCalc as calc,
  rndId,
  is
};
