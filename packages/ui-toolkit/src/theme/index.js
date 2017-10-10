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
  primary: '#3B46CC',
  primaryHover: '#475AD1',
  primaryActive: '#2D3884',
  primaryDesaturated: '#3B4AAF',
  primaryDesaturatedActive: '#2D3884'
};

// TOPOLOGY
const secondary = {
  secondary: '#464646',
  secondaryHover: '#3F3F3F',
  secondaryActive: '#343434'
};

const white = {
  white: '#FFFFFF', // used
  whiteHover: '#F8F8F8', // used
  whiteActive: '#E9E9E9' // used
};

const tertiary = {
  tertiary: '#363636',
  tertiaryActive: 'rgba(54, 74, 205, 0.1)',
  tertiaryActiveColor: '#2931C2'
};

/** ********************************** BASE *********************************** */

export const base = {
  ...primary,
  ...secondary,
  ...white,
  ...tertiary,
  text: '#494949', // used
  grey: '#D8D8D8', // used
  greyLight: '#bdbdbd', // used
  greyTransparent: 'rgba(73,73,73, 0.8)',
  disabled: '#FAFAFA', // used
  background: '#FAFAFA', // used
  green: '#00AF66', // used
  greenDark: '#009858', // used
  orange: '#E38200', // used
  orangeDark: '#CB7400', // used
  red: '#DA4B42', // used
  redDark: '#CD251B', // used
  blue: '#364ACD'
};

/** ********************************** HEADER ********************************** */

const brandBackground = '#1E313B';

/** ********************************** FONTS ********************************** */

export const fonts = {
  semibold: base.secondary,
  regular: base.text,
  abbrBorderColor: base.secondary,
  textMuted: base.secondary
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
export const seperator = '#D9DEF3'; */

/** ******************************** TOPOLOGY ********************************* */

export const topologyBackground = base.secondaryActive;

export const transition = 'all 200ms ease-out';

export default {
  ...base,
  fonts,
  inactive,
  notifications,
  inputError,
  inputWarning,
  topologyBackground,
  brandBackground,
  transition
};
