import { Legend } from 'normalized-styled-components';
import styled from 'styled-components';

const StyledLegend = styled(Legend)`
  font-family: ${props => props.theme.font.families};
  font-weight: ${props => props.theme.font.weight.semibold};
`;

export default StyledLegend;
