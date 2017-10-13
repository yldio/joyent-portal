import React from 'react';
import { css } from 'styled-components';
import MediaQuery from 'react-responsive';
import remcalc from 'remcalc';
import pascalCase from 'pascal-case';

export const breakpoints = {
  small: {
    upper: 767
  },
  medium: {
    upper: 1023,
    lower: 768
  },
  large: {
    upper: 1199,
    lower: 1024
  },
  xlarge: {
    lower: 1200
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
    ${css(...args)};
  }
`;

const toQuery = label => ({ children, ...rest }) => (
  <MediaQuery query={screens[label]}>{children}</MediaQuery>
);

export const styled = Object.keys(screens).reduce(
  (sum, label) => ({
    ...sum,
    [label]: breakpoint(label)
  }),
  {}
);

export const query = Object.keys(screens).reduce(
  (sum, label) => ({
    ...sum,
    [pascalCase(label)]: toQuery(label)
  }),
  {}
);
