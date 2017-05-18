/* eslint react/prop-types: 0 */

import { remcalc } from '../../shared/functions';
import { Baseline, typography } from '../../shared/composers';
import styled, { css } from 'styled-components';
import React from 'react';

// If specificity is an issue (i.e nested elements) check base/index.js first
// before using !important
const elements = [{
  name: 'H1',
  properties: css`
    font-size: ${remcalc(36)};
    font-style: normal;
    font-stretch: normal;
    margin: 0;

    ${typography.medium}
  `
}, {
  name: 'H2',
  properties: css`
    font-size: ${remcalc(24)};

    ${typography.medium}
  `
}, {
  name: 'H3',
  properties: css`
    font-size: ${remcalc(15)};

    ${typography.medium}
  `
}, {
  name: 'P',
  properties: css`
    line-height: ${remcalc(24)};
    font-size: ${remcalc(15)};
  `
}, {
  name: 'Small',
  properties: css`
    line-height: ${remcalc(18)};
    font-size: ${remcalc(14)};
  `
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
  properties = ''
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
    style: React.PropTypes.object
  };

  return {
    ...acc,
    [name]: Baseline(Component)
  };
}, {});

export const H1 = BaseElements.H1;
export const H2 = BaseElements.H2;
export const H3 = BaseElements.H3;
export const P = BaseElements.P;
export const Small = BaseElements.Small;
