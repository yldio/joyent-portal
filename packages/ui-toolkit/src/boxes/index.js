import { css } from 'styled-components';
import remcalc from 'remcalc';

export const borderRadius = remcalc(4);

export const bottomShadow = `
  /* trick prettier */
  0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05)
`;

export const bottomShadowDarker = `
  /* trick prettier */
  0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.1)
`;

export const insetShadow = `
  /* trick prettier */
  inset 0 ${remcalc(3)} 0 0 rgba(0, 0, 0, 0.05)
`;

export const tooltipShadow = `
  /* trick prettier */
  0 ${remcalc(2)} ${remcalc(6)} ${remcalc(1)} rgba(0, 0, 0, 0.1)
`;

export const modalShadow = `
  /* trick prettier */
  0 0 ${remcalc(6)} ${remcalc(1)} rgba(0, 0, 0, 0.1)
`;

export const border = {
  checked: css`
    /* trick prettier */
    ${remcalc(1)} solid ${props => props.theme.primary};
  `,
  unchecked: css`
    /* trick prettier */
    ${remcalc(1)} solid ${props => props.theme.grey};
  `,
  confirmed: css`
    /* trick prettier */
    ${remcalc(1)} solid ${props => props.theme.grey};
  `,
  error: css`
    /* trick prettier */
    ${remcalc(1)} solid ${props => props.theme.red};
  `,
  secondary: css`
    /* trick prettier */
    ${remcalc(1)} solid ${props => props.theme.secondaryActive};
  `
};
