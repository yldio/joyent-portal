const fonts = {
  semibold: '#464646',
  regular: '#646464'
};

const brandPrimary = {
  brandPrimary: '#3B46CC',
  brandPrimaryDark: '#1838C0',
  brandPrimaryDarkest: '#12279F',
  borderPrimary: '#2531BC',
  borderPrimaryDark: '#2531BC',
  borderPrimaryDarkest: '#062BA0',
  brandPrimaryColor: '#FFFFFF'
};

const brandSecondary = {
  brandSecondary: '#FFFFFF',
  brandSecondaryDark: '#F8F8F8',
  brandSecondaryDarkest: '#E9E9E9',
  borderSecondary: '#D8D8D8',
  borderSecondaryDark: '#D8D8D8',
  borderSecondaryDarkest: '#D8D8D8',
  brandSecondaryColor: '#464646'
};

const brandInactive = {
  brandInactive: '#FAFAFA',
  borderInactive: '#D8D8D8',
  brandInactiveColor: '#919191'
};

const notifications = {
  alert: '#DA4B42',
  alertLight: '#FFC7C7',
  confirmation: '#00AF66',
  warning: '#E4A800',
  warningLight: '#FFFAED',
};

const metrics = {
  miniBackground: '#F3F4F9',
  seperator: '#D9DEF3'
};

const colors = {
  ...brandPrimary,
  ...brandSecondary,
  ...brandInactive,
  ...notifications,
  ...metrics,
  ...fonts
};

module.exports = colors;
