import { Legend } from 'normalized-styled-components';
import Baseline from '../baseline';
import typography from '../typography';

const StyledLegend = Legend.extend`
  /* trick prettier */
  ${typography.semibold};
`;

export default Baseline(StyledLegend);
