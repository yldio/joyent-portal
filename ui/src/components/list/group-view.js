import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc } from '../../shared/functions';
import View from './view';
import styled from 'styled-components';

const GroupView = styled(View)`
  display: block;
  padding: ${remcalc(62, 23, 5, 23)};

  background-color: ${colors.inactive.default};
`;

export default Baseline(
  GroupView
);
