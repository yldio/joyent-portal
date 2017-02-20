import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc } from '../../shared/functions';
import { raw as View } from './view';
import styled from 'styled-components';

const GroupView = styled(View)`
  display: block;
  padding-top: ${remcalc(62)};
  padding-left: ${remcalc(23)};
  padding-right: ${remcalc(23)};
  padding-bottom: ${remcalc(5)};
  background-color: ${colors.inactive.default};
`;

export default Baseline(
  GroupView
);
