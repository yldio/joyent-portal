const colors = require('./colors');
const fns = require('../functions');

const {
  remcalc
} = fns;

const {
  base
} = colors;

module.exports = {
  borderRadius: remcalc(4),
  bottomShaddow: `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05)`,
  bottomShaddowDarker: `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.1)`,
  insetShaddow: `inset 0 ${remcalc(3)} 0 0 rgba(0, 0, 0, 0.05)`,
  border: {
    checked: `${remcalc(1)} solid ${base.primary}`,
    unchecked: `${remcalc(1)} solid ${base.grey}`,
    confirmed: `${remcalc(1)} solid ${base.grey}`,
    error: `${remcalc(1)} solid ${base.red}`
  }
};
