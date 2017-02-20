// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css

import { css } from 'styled-components';
import { remcalc } from '../functions';

const bounds = {
  small: {
    upper: remcalc(768)
  },
  medium: {
    upper: remcalc(1024),
    lower: remcalc(769)
  },
  large: {
    upper: remcalc(1200),
    lower: remcalc(1025)
  },
  xlarge: {
    lower: remcalc(1201)
  }
};

const screens = {
  // >= 768px
  smallOnly: `only screen and (max-width: ${bounds.small.upper})`,
  small: `only screen and (min-width: ${bounds.small.upper}})`,
  // >= 1024px
  mediumOnly: `only screen and (min-width: ${bounds.medium.lower})
    and (max-width: ${bounds.medium.upper})`,
  mediumDown: `only screen and (max-width: ${bounds.medium.upper})`,
  medium: `only screen and (min-width: ${bounds.medium.lower})`,
  // >= 1200px
  largeOnly: `only screen and (min-width: ${bounds.large.lower})
    and (max-width: ${bounds.large.upper})`,
  largeDown: `only screen and (max-width: ${bounds.large.upper})`,
  large: `only screen and (min-width: ${bounds.large.upper})`,
  xlarge: `only screen and (min-width: ${bounds.xlarge.lower})
    and (max-width: ${bounds.xlarge.upper})`,
  xlargeUp: `only screen and (min-width: ${bounds.xlarge.lower})`
};

const breakpoint = (label) => (...args) => css`
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
