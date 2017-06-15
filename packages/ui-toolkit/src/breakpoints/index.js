import { css } from 'styled-components';
import remcalc from 'remcalc';

export const breakpoints = {
  small: {
    upper: 768
  },
  medium: {
    upper: 1024,
    lower: 769
  },
  large: {
    upper: 1200,
    lower: 1025
  },
  xlarge: {
    lower: 1201
  }
};

const screens = {
  // >= 768px
  smallOnly: `only screen and (max-width: ${remcalc(breakpoints.small.upper)})`,
  small: `only screen and (min-width: ${remcalc(breakpoints.small.upper)})`,
  // >= 1024px
  mediumOnly: `only screen and (min-width: ${remcalc(breakpoints.medium.lower)})
    and (max-width: ${remcalc(breakpoints.medium.upper)})`,
  mediumDown: `only screen and (max-width: ${remcalc(
    breakpoints.medium.upper
  )})`,
  medium: `only screen and (min-width: ${remcalc(breakpoints.medium.lower)})`,
  // >= 1200px
  largeOnly: `only screen and (min-width: ${remcalc(breakpoints.large.lower)})
    and (max-width: ${remcalc(breakpoints.large.upper)})`,
  largeDown: `only screen and (max-width: ${remcalc(breakpoints.large.upper)})`,
  large: `only screen and (min-width: ${remcalc(breakpoints.large.upper)})`,
  xlarge: `only screen and (min-width: ${remcalc(breakpoints.xlarge.lower)})
    and (max-width: ${remcalc(breakpoints.xlarge.upper)})`,
  xlargeUp: `only screen and (min-width: ${remcalc(breakpoints.xlarge.lower)})`
};

const breakpoint = label => (...args) => css`
  @media ${screens[label]} {
    ${css(...args)}
  }
`;

export const smallOnly = breakpoint('smallOnly');
export const small = breakpoint('small');
export const mediumOnly = breakpoint('mediumOnly');
export const mediumDown = breakpoint('mediumDown');
export const medium = breakpoint('medium');
export const largeOnly = breakpoint('largeOnly');
export const largeDown = breakpoint('largeDown');
export const large = breakpoint('large');
export const xlarge = breakpoint('xlarge');
export const xlargeUp = breakpoint('xlargeUp');

export default {
  smallOnly,
  small,
  mediumOnly,
  mediumDown,
  medium,
  largeOnly,
  largeDown,
  large,
  xlarge,
  xlargeUp,
  breakpoints
};
