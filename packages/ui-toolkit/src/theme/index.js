import remcalc from 'remcalc';

/*
* There should be no string value to keys outside the `base` object.
* If a new colors needs to be used, check it doesn't already exist, or
* anything that is similar, and if it doesn't, add a key-value and reference from
* there. Lets try and keep different color variations down ot a minimum.
*
---
Color Object example
const color_name = {
  color_name: '#FFFFFF',
  color_name_style1: '#FFF000',
  color_name_style2: '#FFF333',
};
*/

const primary = {
  primary: 'rgb(59, 70, 204)',
  primaryHover: 'rgb(72, 83, 217)',
  primaryActive: 'rgb(45, 56, 132)'
};

// TOPOLOGY
const secondary = {
  secondary: 'rgb(70, 70, 70)',
  secondaryHover: 'rgb(53, 53, 53)',
  secondaryActive: 'rgb(45, 45, 45)'
};

const white = {
  white: 'rgb(255, 255, 255)',
  whiteHover: 'rgb(247, 247, 247)',
  whiteActive: 'rgb(230, 230, 230)'
};

const grey = {
  grey: 'rgb(216, 216, 216)',
  greyTransparent: 'rgba(73, 73, 73, 0.8)',
  greyLight: 'rgb(189, 189, 189)',
  greyDark: 'rgb(151, 151, 151)',
  greyDarker: 'rgb(052, 052, 052)'
};

const green = {
  green: 'rgb(0, 152, 88)',
  greenDark: 'rgb(0, 129, 56)'
};

const orange = {
  orange: 'rgb(227, 130, 0)',
  orangeDark: 'rgb(203, 116, 0)'
};

const red = {
  red: 'rgb(210, 67, 58)',
  redDark: 'rgb(205, 37, 27)'
};

/** ********************************** BASE *********************************** */

export const base = {
  ...primary,
  ...secondary,
  ...white,
  ...red,
  ...orange,
  ...green,
  ...grey,
  text: 'rgba(73, 73, 73, 1)',
  textDisabled: 'rgba(73, 73, 73, 0.5)',
  placeholder: 'rgb(99, 99, 99)',
  disabled: 'rgb(250, 250, 250)', // used
  background: 'rgb(250, 250, 250)' // used
};

/** ********************************** HEADER ********************************** */

const brandBackground = 'rgb(30, 49, 59)';

/** ********************************** FONTS ********************************** */

export const font = {
  semibold: base.secondary,
  regular: base.text,
  abbrBorderColor: base.secondary,
  textMuted: base.secondary,
  family: '"Libre Franklin"',
  families:
    '"Libre Franklin", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica, sans-serif',
  href: () =>
    `${document.location.protocol}//${
      document.location.host
    }/fonts/css?family=Libre+Franklin:400,500,600`,
  weight: {
    semibold: 600,
    medium: 500,
    normal: 400
  }
};

export const monoFont = {
  semibold: base.secondary,
  regular: base.text,
  abbrBorderColor: base.secondary,
  textMuted: base.secondary,
  family: '"Roboto Mono"',
  families: '"Roboto Mono", monospace',
  href: () =>
    `${document.location.protocol}//${
      document.location.host
    }/fonts/css?family=Roboto+Mono:700,400`,
  weight: {
    bold: 700,
    normal: 400
  }
};

/** ******************************** INACTIVE ********************************* */

export const inactive = {
  default: base.disabled,
  border: base.grey,
  text: base.grey
};

/** ***************************** NOTIFICATIONS ******************************* */

export const notifications = {
  alert: base.red,
  confirmation: base.green,
  warning: base.orange
};

/** ********************************* FORMS *********************************** */

export const inputError = base.red;
export const inputWarning = base.orange;

/** ******************************** METRICS ********************************* */

/* export const miniBackground = '#F3F4F9';
export const separator = '#D9DEF3'; */

/** ******************************** TOPOLOGY ********************************* */

export const topologyBackground = base.secondaryActive;

export const transition = 'all 200ms ease-out';

export const borderRadius = remcalc(4);

export const shadows = {
  bottomShadow: `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05)`,
  bottomShadowDarker: `0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.1)`
};

export default {
  ...base,
  font,
  monoFont,
  inactive,
  notifications,
  inputError,
  inputWarning,
  topologyBackground,
  brandBackground,
  transition,
  borderRadius,
  shadows,
  transparent: 'transparent'
};
