import { Baseline, typography } from '../../../shared/composers';
import { colors } from '../../../shared/constants';
import { remcalc } from '../../../shared/functions';
import styled from 'styled-components';

//margin: ${remcalc(18)} ${remcalc(24)} !important;
const Title = styled.h3`
  display: flex;
  align-self: flex-start;
  margin: ${remcalc(18)} auto ${remcalc(18)} ${remcalc(24)} !important;

  ${typography.normal};
  font-size: ${remcalc(15)};
  font-style: normal;
  line-height: 1.5;
  color: ${colors.base.white};
`;

export default Baseline(
  Title
);
