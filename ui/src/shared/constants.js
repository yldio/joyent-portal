const styled = require('styled-components');

const calc = require('reduce-css-calc');
const traverse = require('traverse');
const isFunction = require('lodash.isfunction');
const Color = require('color');

const tables = {
  bg: 'transparent',
  cellPadding: '.75rem'
};

// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css
const sizes = {
  gridColumns: 12,
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
    unchecked: '1px solid rgb(216, 216, 216)',
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
  color: colors.brandPrimary,
  decoration: 'none',
  hoverColor: ({
    color
  }) => {
    return Color(color).darken(0.15).hex();
  },
  hoverDecoration: 'underline'
};

// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css
const screens = {
  // >= 768px
  small: 'only screen and (min-width: 48rem)',
  // >= 1024px
  medium: 'only screen and (min-width: 64rem)',
  // >= 1200px
  large: 'only screen and (min-width: 75rem)'
};

const breakpoints = Object.keys(screens).reduce((acc, label) => {
  return {
    ...acc,
    [label]: (...args) => styled.css`
      @media ${screens[label]} {
        ${styled.css(...args)}
      }
    `
  };
}, {});

const constants = traverse({
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

module.exports = {
  ...constants,
  breakpoints
};
