const calc = require('reduce-css-calc');
const traverse = require('traverse');
const isFunction = require('lodash.isfunction');
const Color = require('color');

const tables = {
  tableBg: 'transparent',
  tableCellPadding: '.75rem'
};

// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css
const sizes = {
  gutterWidth: '1rem',
  outerMargin: '2rem',
  gutterCompensation: ({
    gutterWidth
  }) => {
    return calc(`calc((${gutterWidth} * 0.5) * -1)`);
  },
  halfGutterWidth: ({
    gutterWidth
  }) => {
    return calc(`calc(${gutterWidth} * 0.5)`);
  },
  xsMin: 30,
  smMin: 48,
  mdMin: 64,
  lgMin: 75,
  screenXsMin: ({
    xsMin
  }) => {
    return `${xsMin}em`;
  },
  screenSmMin: ({
    smMin
  }) => {
    return `${smMin}em`;
  },
  screenMdMin: ({
    mdMin
  }) => {
    return `${mdMin}em`;
  },
  screenLgMin: ({
    lgMin
  }) => {
    return `${lgMin}em`;
  },
  containerSm: ({
    gutterWidth,
    smMin
  }) => {
    return calc(`calc(${smMin} + ${gutterWidth})`);
  },
  containerMd: ({
    gutterWidth,
    mdMin
  }) => {
    return calc(`calc(${mdMin} + ${gutterWidth})`);
  },
  containerLg: ({
    gutterWidth,
    lgMin
  }) => {
    return calc(`calc(${lgMin} + ${gutterWidth})`);
  }
};

const boxes = {
  borderRadius: '4px',
  bottomShaddow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
  insetShaddow: 'inset 0 3px 0 0 rgba(0, 0, 0, 0.05)',
  border: {
    checked: '1px solid #2532bb',
    unchecked: '1px solid #d8d8d8',
    confirmed: '1px solid #23AC32'
  }
};

const forms = {
  cursorDisabled: 'not-allowed'
};

const colors = {
  brandPrimary: '#364acd',
  brandSecondary: '#160d42',
  grayLight: '#818a91',
  confirmation: '#38C647',
  background: '#ffffff',
  border: '#D8D8D8',
  borderSelected: '#1D35BC',
  warning: '#e4a800',
  warningLight: '#fffaed',
  alert: '#D0011B',
  alertLight: '#ffc7c7'
};

const typography = {
  dtFontWeight: 'bold',
  abbrBorderColor: colors.grayLight,
  textMuted: colors.grayLight
};

const links = {
  linkColor: colors.brandPrimary,
  linkDecoration: 'none',
  linkHoverColor: ({
    linkColor
  }) => {
    return Color(linkColor).darken('0.15').hexString();
  },
  linkHoverDecoration: 'underline'
};

// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css
const breakpoints = {
  // >= 768px
  sm: 'only screen and (min-width: 48em)',
  // >= 1024px
  md: 'only screen and (min-width: 64em)',
  // >= 1200px
  lg: 'only screen and (min-width: 75em)'
};

module.exports = traverse({
  breakpoints,
  colors,
  boxes,
  forms,
  links,
  sizes,
  tables,
  typography
}).map(function(x) {
  return isFunction(x) ? x(this.parent.node) : x;
});
