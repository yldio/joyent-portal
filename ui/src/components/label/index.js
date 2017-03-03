import { Baseline, typography } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc } from '../../shared/functions';
import styled from 'styled-components';

const Label = styled.label`
  ${typography.semibold};
  font-size: ${remcalc(16)};
  font-style: normal;
  font-stretch: normal;
  color: ${colors.base.secondary};
`;

export default Baseline(
  Label
);
