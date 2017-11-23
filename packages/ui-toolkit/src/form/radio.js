import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import BaseToggle from './base/toggle';
import Baseline from '../baseline';
import BaseInput from './base/input';

const Li = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;

  label {
    font-weight: 400;
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

const RadioItem = BaseInput(({ children, id, ...rest }) => (
  <Li {...rest}>{children}</Li>
));

const RadioStyled = Baseline(
  BaseToggle({
    container: RadioItem,
    type: 'radio'
  })
);

/**
 * @example ./usage-radio.md
 */
const Radio = ({ children, ...rest }) => (
  <RadioStyled {...rest}>{children}</RadioStyled>
);

export const RadioList = Baseline(Ul);
export default Radio;

Radio.propTypes = {
  /**
   * Is the Radio checked ?
   */
  checked: PropTypes.bool,
  /**
   * Is the Radio disabled ?
   */
  disabled: PropTypes.bool
};

Radio.defaultProps = {
  checked: false,
  disabled: false
};
