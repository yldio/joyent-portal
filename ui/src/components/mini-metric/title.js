import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';

const Title = styled.h3`
  margin: 0;
  text-align: right;
  font-size: ${remcalc(14)};
  font-weight: 600;
  font-style: normal;
  line-height: 1.29;
  color: ${colors.semibold};
  margin-bottom: ${remcalc(3)} !important;
`;

export default Baseline(
  Title
);
