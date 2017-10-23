import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import typography from '../typography';
import BaseInput from './base/input';
import BaseToggle from './base/toggle';
import Baseline from '../baseline';

const Li = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  ${typography.fontFamily};
  ${typography.normal};

  label {
    font-weight: 400;
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

const CheckboxItem = BaseInput(({ children }) => <Li>{children}</Li>);

const CheckboxStyled = Baseline(
  BaseInput(
    BaseToggle({
      container: CheckboxItem,
      type: 'checkbox'
    })
  )
);

/**
 * @example ./usage-checkbox.md
 */
const Checkbox = ({ children, ...rest }) => (
  <CheckboxStyled {...rest}>{children}</CheckboxStyled>
);

export const CheckboxList = Baseline(Ul);

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
