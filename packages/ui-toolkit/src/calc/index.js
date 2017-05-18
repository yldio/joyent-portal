import calc from 'reduce-css-calc';

export default str => calc(`calc(${str})`);
