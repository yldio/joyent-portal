import styled from 'styled-components';
import Toggle from '../toggle';
import { Baseline } from '../../../shared/composers';
import BaseInput from '../base-input';

const RadioItem = BaseInput(styled.li`
  list-style-type: none;
`);

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const Radio = Toggle({
  container: RadioItem,
  type: 'radio'
});

export default Baseline(
  Radio
);

export const RadioList = Baseline(
  StyledUl
);
