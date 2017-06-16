import { css } from 'styled-components';
import remcalc from 'remcalc';

export const borderRadius = remcalc(4);
export const bottomShaddow = `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05)`;
export const bottomShaddowDarker = `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.1)`;
export const insetShaddow = `inset 0 ${remcalc(3)} 0 0 rgba(0, 0, 0, 0.05)`;
export const tooltipShadow = `0 ${remcalc(2)} ${remcalc(6)} ${remcalc(
  1
)} rgba(0, 0, 0, 0.1)`;
export const modalShadow = `0 0 ${remcalc(6)} ${remcalc(1)} rgba(0, 0, 0, 0.1)`;

export const border = {
  checked: css`${remcalc(1)} solid ${props => props.theme.primary}`,
  unchecked: css`${remcalc(1)} solid ${props => props.theme.grey}`,
  confirmed: css`${remcalc(1)} solid ${props => props.theme.grey}`,
  error: css`${remcalc(1)} solid ${props => props.theme.red}`
};
