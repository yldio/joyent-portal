/* const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;


const elements = {
  H1: {
    'font-size': 30,
    'line-height': 34,
  },
  H2: {
    'font-size': 26,
    'line-height': 30,
  },
  H3: {
    'font-size': 22,
    'line-height': 28,
  },
  H4: {
    'font-size': 18,
    'line-height': 24,
  },
  H5: {
    'font-size': 16,
    'line-height': 20,
  },
  P: {
    'font-size': 12,
    'line-height': 18,
  },
  Small: {
    'font-size': 10,
    'line-height': 14,
  },
};
/*

/*
* Create empty exportable object (BaseComponents)
* Loop Over each element in elements object
* Create React component with element name
* Loop over each property in element object and create string of CSS
* Use CSS in Styled Component
* Add Component to BaseComponents
*/

// let elementsAndTheirCSS = {};
//
// const GenerateBaseElements = Object.keys(elements).forEach( element => {
//   const attrs = elements[element];
//   const _element = element.toLowerCase();
//   let styles = '';
//
//   elementsAndTheirCSS[_element] = Object.keys(attrs).forEach( attr => {
//     styles += `${attr}: ${attrs[attr]};`;
//   });
//
//   elementsAndTheirCSS[_element] = styles
// });
//
// let letsExportThese = {}
//
// Object.keys(elementsAndTheirCSS).forEach( (component, index) => {
//   const ComponentType = component
//   const css = elementsAndTheirCSS[component];
//
//   letsExportThese = {
//     ...letsExportThese,
//     styled(ComponentType)`
//       ${css}
//     `;
//   }
// });

// module.export = letsExportThese;