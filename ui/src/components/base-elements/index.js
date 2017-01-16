/* eslint react/prop-types: 0 */

const Styled = require('styled-components');
const React = require('react');

const {
  default: styled
} = Styled;


// If specificity is an issue (i.e nested elements) check base/index.js first
// before using !important
const elements = [
  {
    name: 'H1',
    properties: {
      'line-height': '70px',
      'font-size': '60px'
    }
  },
  {
    name: 'H2',
    properties: {
      'line-height': '60px',
      'font-size': '40px'
    }
  }
];

/*
 Loop over each item in element array.
 Create styled component for each name, and
 use properties from object as styles
 Then export all Base Elements.

 Usage:
 const H1 = require(base-components).H1;
 */

const BaseElements = {};

elements.forEach( element => {
  const ElementName = element.name;

  BaseElements[ElementName] = ({
    children,
    style
  }) => {

    const StyledElement = styled[element.name.toLowerCase()]`
      ${element.properties}
    `;

    return (
      <StyledElement style={style}>
        {children}
      </StyledElement>
    );
  };

  // TODO: Fix proptype validation and remove eslint ignore line 1
  BaseElements[ElementName].propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  };
});

module.exports = BaseElements;