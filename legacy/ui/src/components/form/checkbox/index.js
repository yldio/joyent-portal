import { Baseline } from '../../../shared/composers';
import BaseInput from '../base-input';
import ToggleBase from '../toggle-base';

const Checkbox = ToggleBase({
  type: 'checkbox'
});

export default Baseline(
  BaseInput(Checkbox)
);
