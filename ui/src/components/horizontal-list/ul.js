import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';

const Ul = styled.ul`
  list-style-type: none;
  margin-bottom: ${remcalc(33)};
`;

export default Baseline(
  Ul
);
