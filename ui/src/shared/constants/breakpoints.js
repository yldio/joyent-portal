const styled = require('styled-components');

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

module.exports = breakpoints;
