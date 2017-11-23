import { Legend } from 'normalized-styled-components';

import Baseline from '../baseline';

const StyledLegend = Legend.extend`
  /* trick prettier */
  font-weight: ${props => props.theme.font.weight.semibold};
`;

export default Baseline(StyledLegend);
