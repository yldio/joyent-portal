import React from 'react';
import PropTypes from 'prop-types';
import BaseInput, { Stylable } from './base/input';

const InputStyled = BaseInput(Stylable('input'));

/**
 * @example ./usage-input.md
 */
const Input = ({ children, ...rest }) => (
  <InputStyled {...rest}>{children}</InputStyled>
);

export default Input;

Input.propTypes = {
  /**
   * Input type
   */
  type: PropTypes.string,
  /**
   * Is the checkbox disabled ?
   */
  disabled: PropTypes.bool,
  /**
   * Placeholder text for the Input
   */
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  disabled: false
};
