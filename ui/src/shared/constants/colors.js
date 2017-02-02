/*
* There should be no string value to keys outside the `base` object.
* If a new colors needs to be used, check it doesn't already exist, or
* anything that is similar, and if it doesn't, add a key-value and reference from
* there. Lets try and keep different color variations down ot a minimum.
* */

const base = {
  primary: '#1838c0',
  primaryLight: '#3b46cc',
  primaryDark: '#12279f',
  secondary: '#464646',
  secondaryDark: '#646464',
  secondaryLight: '#919191',
  white: '#FFFFFF',
  grey:  '#f8f8f8',
  greyLight: '#e9e9e9',
  greyDark: '#919191',
  red: '#DA4B42',
  yellow: '#E4A800',
  green: '#00AF66',
};

const fonts = {
  semibold: base.secondary,
  regular: base.secondaryDark
};

const inactive = {
  default: '#FAFAFA',
  border: base.greyLight,
  text: base.greyLight
};

const notifications = {
  alert: base.red,
  confirmation: base.green,
  warning: base.yellow,
};

const forms = {
  inputError: base.red,
  inputWarning: base.yellow
};

const metrics = {
  miniBackground: '#F3F4F9',
  seperator: '#D9DEF3'
};

const topology = {
  topologyBackground: '#343434',
};

const colors = {
  ...metrics,
  ...topology,
  ...forms,
  inactive,
  notifications,
  base,
  fonts
};

module.exports = colors;
