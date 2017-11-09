import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';

import Baseline from '../baseline';
import BaseInput, { Stylable } from './base/input';

const TextareaInput = Baseline(BaseInput(Stylable('textarea')));

const BaseTextarea = TextareaInput.extend`
  position: relative;
  display: inline-flex;

  ${is('fluid')`
    flex: 1 1 auto;
    width: 100%;
  `};
`;

/**
 * @example ./usage-textarea.md
 */
const Textarea = ({ children, fluid, ...rest }) => (
  <BaseTextarea {...rest} fluid={fluid} type="textarea">
    {children}
  </BaseTextarea>
);

export default Textarea;

Textarea.propTypes = {
  /**
   * Is the Textarea disabled ?
   */
  disabled: PropTypes.bool
};

Textarea.defaultProps = {
  disabled: false
};
