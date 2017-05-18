import styled from 'styled-components';
import ToggleBase from '../toggle-base';
import { Baseline } from '../../../shared/composers';
import BaseInput from '../base-input';
import React from 'react';

const Li = styled.li`
  list-style-type: none;
`;

const RadioItem = BaseInput(({
  children,
  id, // hide id from li
  ...props
}) => (
  <Li {...props}>
    {children}
  </Li>
));

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const Radio = ToggleBase({
  container: RadioItem,
  type: 'radio'
});

export default Baseline(
  Radio
);

export const RadioList = Baseline(
  StyledUl
);
