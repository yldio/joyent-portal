import { base } from './colors';
import { remcalc } from '../functions';

export const borderRadius = remcalc(4);
export const bottomShaddow = `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05)`;
export const bottomShaddowDarker = `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.1)`;
export const insetShaddow = `inset 0 ${remcalc(3)} 0 0 rgba(0, 0, 0, 0.05)`;

export const tooltipShadow =
  `0 ${remcalc(2)} ${remcalc(6)} ${remcalc(1)} rgba(0, 0, 0, 0.1)`;

export const border = {
  checked: `${remcalc(1)} solid ${base.primary}`,
  unchecked: `${remcalc(1)} solid ${base.grey}`,
  confirmed: `${remcalc(1)} solid ${base.grey}`,
  error: `${remcalc(1)} solid ${base.red}`
};
