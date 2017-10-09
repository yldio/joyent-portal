import styled from 'styled-components';
import BaseToggle from './base/toggle';
import Baseline from '../baseline';
import BaseInput from './base/input';
import typography from '../typography';
import React from 'react';

const Li = styled.li`
  list-style-type: none;
  ${typography.normal};
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

const Radio = Baseline(
  BaseToggle({
    container: RadioItem,
    type: 'radio'
  })
);

/**
 * @example ./usage-radio.md
 */
export default ({ children, ...rest }) => <Radio {...rest}>{children}</Radio>;

export const RadioList = Baseline(Ul);
