import { Baseline } from '../../../shared/composers';
import BaseInput from '../base-input';
import Toggle from '../toggle';

const Checkbox = Toggle({
  type: 'checkbox'
});

export default Baseline(
  BaseInput(Checkbox)
);
