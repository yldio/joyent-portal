import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import BaseInput from './base/input';
import BaseToggle from './base/toggle';

const Li = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;

  label {
    font-weight: 400;
  }
`;

const Ul = styled.ul`
  padding: 0;
`;

const CheckboxItem = BaseInput(({ children }) => <Li>{children}</Li>);

const CheckboxStyled = BaseInput(
  BaseToggle({
    container: CheckboxItem,
    type: 'checkbox'
  })
);

/**
 * @example ./usage-checkbox.md
 */
const Checkbox = ({ children, ...rest }) => (
  <CheckboxStyled {...rest}>{children}</CheckboxStyled>
);

export const CheckboxList = Ul;

export default Checkbox;

Checkbox.propTypes = {
  /**
   * Is the checkbox checked ?
   */
  checked: PropTypes.bool,
  /**
   * Is the checkbox disabled ?
   */
  disabled: PropTypes.bool
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false
};
