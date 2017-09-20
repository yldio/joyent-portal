import { Small } from 'normalized-styled-components';
import remcalc from 'remcalc';
import typography from '../typography';

export default Small.extend`
  ${typography.normal};

  line-height: ${remcalc(18)};
  font-size: ${remcalc(14)};
`;
