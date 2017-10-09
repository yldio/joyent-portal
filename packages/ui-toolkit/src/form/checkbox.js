import styled from 'styled-components';
import React from 'react';

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

const CheckboxItem = BaseInput(({ children, id, ...rest }) => (
  <Li {...rest}>{children}</Li>
));

const Checkbox = Baseline(
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
export default ({ children, ...rest }) => (
  <Checkbox {...rest}>{children}</Checkbox>
);

export const CheckboxList = Baseline(Ul);
