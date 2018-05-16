import remcalc from 'remcalc';

export const breakpoints = {
  small: {
    upper: 599
  },
  medium: {
    upper: 999,
    lower: 600
  },
  large: {
    upper: 1399,
    lower: 1000
  },
  xlarge: {
    lower: 1400
  }
};

export default {
  // >= 599px
  smallOnly: `only screen and (max-width: ${remcalc(breakpoints.small.upper)})`,
  small: `only screen and (min-width: ${remcalc(breakpoints.small.upper)})`,
  // >= 999px
  mediumOnly: `only screen and (min-width: ${remcalc(breakpoints.medium.lower)})
    and (max-width: ${remcalc(breakpoints.medium.upper)})`,
  mediumDown: `only screen and (max-width: ${remcalc(
    breakpoints.medium.upper
  )})`,
  medium: `only screen and (min-width: ${remcalc(breakpoints.medium.lower)})`,
  // >= 1400px
  largeOnly: `only screen and (min-width: ${remcalc(breakpoints.large.lower)})
    and (max-width: ${remcalc(breakpoints.large.upper)})`,
  largeDown: `only screen and (max-width: ${remcalc(breakpoints.large.upper)})`,
  large: `only screen and (min-width: ${remcalc(breakpoints.large.lower)})`,
  xlarge: `only screen and (min-width: ${remcalc(breakpoints.xlarge.lower)})
    and (max-width: ${remcalc(breakpoints.xlarge.upper)})`,
  xlargeUp: `only screen and (min-width: ${remcalc(breakpoints.xlarge.lower)})`
};
