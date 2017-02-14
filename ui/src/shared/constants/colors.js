/*
* There should be no string value to keys outside the `base` object.
* If a new colors needs to be used, check it doesn't already exist, or
* anything that is similar, and if it doesn't, add a key-value and reference from
* there. Lets try and keep different color variations down ot a minimum.
* */

let base = {
  primary: '#1838c0',
  primaryLight: '#3b46cc',
  primaryDark: '#12279f',
  secondary: '#464646',
  secondaryDark: '#646464',
  secondaryLight: '#919191',
  white: '#FFFFFF',
  grey:  '#f8f8f8',
  greyLight: '#e9e9e9',
  greyDark: '#d8d8d8',
  greyDarker: '#919191',
  green: '#00AF66',
  greenDark: '#009858',
  orange: '#E38200',
  orangeDark: '#CB7400',
  yellow: '#E4A800',
  red: '#DA4B42',
  redDark: '#CD251B',
};

/*
Color Object example

const color_name = {
  color_name: '#FFFFFF',
  color_name_style1: '#FFF000',
  color_name_style2: '#FFF333',
};
*/

const primary = {
  primary: '#3B47CC',
  primaryHover: '#1838C0',
  primaryActive: '#12279F',
  primaryDestaurated: '#3B4AAF',
  primaryDesaturatedHover: '#34429D',
  primaryDestauratedActive: '#2D3884',
  primaryDark: '#2D3884',
  primaryDarkHover: '#34429D',
  primaryDarkActive: '#2D3884',
};

const secondary = {
  secondary: '#464646',
  secondaryHover: '#3F3F3F',
  secondaryActive: '#343434',
};

const white = {
  white: '#FFFFFF',
  whiteHover: '#F8F8F8',
  whiteActive: '#E9E9E9',
};

const grey = {
  grey: '#D8D8D8',
}

base = {
  ...primary,
  ...secondary,
  ...white,
  ...grey,
  disabled: "#FAFAFA",
  background: "#FAFAFA",
  green: '#00AF66',
  greenDark: '#009858',
  orange: '#E38200',
  orangeDark: '#CB7400',
  red: '#DA4B42',
  redDark: '#CD251B',
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
