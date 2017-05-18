import styled from 'styled-components';
import { Legend } from 'normalized-styled-components';
import Baseline from '../baseline';
import typography from '../typography';

const StyledLegend = styled(Legend)`
  ${typography.fontFamily};
  ${typography.semibold};
`;

export default Baseline(StyledLegend);
