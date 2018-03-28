import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import BaseToggle from './base/toggle';
import BaseInput from './base/input';

const Li = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul`
  padding: 0;
`;

const RadioItem = BaseInput(({ children, id, ...rest }) => (
  <Li {...rest}>{children}</Li>
));

const RadioStyled = BaseToggle({
  container: RadioItem,
  type: 'radio'
});

/**
 * @example ./usage-radio.md
 */
const Radio = ({ children, ...rest }) => (
  <RadioStyled {...rest}>{children}</RadioStyled>
);

export const RadioList = Ul;
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
  disabled: false
};
