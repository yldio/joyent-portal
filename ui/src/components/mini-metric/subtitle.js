import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';

const Subtitle = styled.p`
  margin: 0;
  text-align: right;
  font-size: ${remcalc(12)};
  line-height: ${remcalc(18)};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.regular};
`;

export default Baseline(
  Subtitle
);
