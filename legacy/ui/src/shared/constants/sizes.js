import calc from 'reduce-css-calc';

// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css
export const gridColumns = 12;
export const gutterWidth = '1rem';
export const outerMargin = '2rem';
export const xsMin = 30;
export const smMin = 48;
export const mdMin = 64;
export const lgMin = 75;

export const gutterCompensation = ({
  gutterWidth
}) => calc(`calc((${gutterWidth} * 0.5) * -1)`);

export const halfGutterWidth = ({
  gutterWidth
}) => calc(`calc(${gutterWidth} * 0.5)`);

export const screenXsMin = ({
  xsMin
}) => `${xsMin}em`;

export const screenSmMin = ({
  smMin
}) => `${smMin}em`;

export const screenMdMin = ({
  mdMin
}) => `${mdMin}em`;

export const screenLgMin = ({
  lgMin
}) => `${lgMin}em`;

export const containerSm = ({
  gutterWidth,
  smMin
}) => calc(`calc(${smMin} + ${gutterWidth})`);

export const containerMd = ({
  gutterWidth,
  mdMin
}) => calc(`calc(${mdMin} + ${gutterWidth})`);

export const containerLg = ({
  gutterWidth,
  lgMin
}) => calc(`calc(${lgMin} + ${gutterWidth})`);
