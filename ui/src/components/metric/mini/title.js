import { remcalc } from '../../../shared/functions';
import { Baseline, typography } from '../../../shared/composers';
import { colors } from '../../../shared/constants';
import styled from 'styled-components';

const Title = styled.h3`
  margin: 0;
  margin-bottom: ${remcalc(3)} !important;

  ${typography.semibold};
  text-align: right;
  font-size: ${remcalc(14)};
  font-style: normal;
  line-height: 1.29;

  color: ${colors.semibold};
`;

export default Baseline(
  Title
);
