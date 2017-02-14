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

const base = {
  ...primary,
  ...secondary,
  ...white,
  text: '#646464',
  grey: '#D8D8D8',
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
  regular: base.text,
};

const inactive = {
  default: base.disabled,
  border: base.grey,
  text: base.grey,
};

const notifications = {
  alert: base.red,
  confirmation: base.green,
  warning: base.orange,
};

const forms = {
  inputError: base.red,
  inputWarning: base.orange
};

const metrics = {
  miniBackground: '#F3F4F9',
  seperator: '#D9DEF3'
};

const topology = {
  topologyBackground: base.secondaryActive,
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
