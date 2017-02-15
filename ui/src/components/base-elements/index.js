/* eslint react/prop-types: 0 */

const Styled = require('styled-components');
const React = require('react');

const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const composers = require('../../shared/composers');

const {
  default: styled
} = Styled;

const {
  colors,
} = constants;

const {
  Baseline
} = composers;

const {
  remcalc
} = fns;

// If specificity is an issue (i.e nested elements) check base/index.js first
// before using !important
const elements = [{
  name: 'H1',
  properties: {
    'font-size': remcalc(36),
    'font-weight': 600,
    'font-style': 'normal',
    'font-stretch': 'normal',
    'color': colors.base.primaryLight,
    'margin': 0
  }
}, {
  name: 'H2',
  properties: {
    'font-size': remcalc(24),
  }
}, {
  name: 'H3',
  properties: {
    'font-size': remcalc(16),
  }
}, {
  name: 'P',
  properties: {
    'line-height': remcalc(24),
    'font-size': remcalc(16),
  }
}, {
  name: 'Small',
  properties: {
    'line-height': remcalc(18),
    'font-size': remcalc(14),
  },
}];

/*
 Loop over each item in element array.
 Create styled component for each name, and
 use properties from object as styles
 Then export all Base Elements.

 Usage:
 const H1 = require(base-components).H1;
 */
const BaseElements = elements.reduce((acc, {
  name = '',
  properties = {}
}) => {
  const StyledElement = styled[name.toLowerCase()]`
    ${properties}
  `;

  const Component = ({
    className = '',
    children = null,
    style = {}
  }) => (
    <StyledElement className={className} style={style}>
      {children}
    </StyledElement>
  );

  // TODO: Fix proptype validation and remove eslint ignore line 1
  Component.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  };

  return {
    ...acc,
    [name]: Baseline(Component)
  };
}, {});

module.exports = BaseElements;
