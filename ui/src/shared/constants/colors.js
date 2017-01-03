const brandPrimary = {
  brandPrimary: '#3B46CC',
  brandPrimaryDark: '#1838C0',
  brandPrimaryDarkest: '#12279F',
};

const brandSecondary = {
  brandSecondary: '#646464',
  brandSecondaryDark: '#464646',
  brandSecondaryDarkest: '#160D42',
};

const notifications = {
  alert: '#DA4B42',
  alertLight: '#FFC7C7',
  confirmation: '#00AF66',
  warning: '#E4A800',
  warningLight: '#FFFAED',
};

const colors = {

  white: '#FFFFFF',
  backgroundInactive: '#F9F9F9',

  ...brandPrimary,
  ...brandSecondary,
  ...notifications
};

module.exports = colors;
