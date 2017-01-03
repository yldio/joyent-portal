const calc = require('reduce-css-calc');

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

module.exports = sizes;
