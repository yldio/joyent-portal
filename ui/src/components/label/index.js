import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc } from '../../shared/functions';
import styled from 'styled-components';

const Label = styled.label`
  font-size: ${remcalc(16)};
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.base.secondary};
`;

export default Baseline(
  Label
);
