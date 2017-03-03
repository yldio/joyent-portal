import styled from 'styled-components';
import { Baseline, typography } from '../../shared/composers';
import { remcalc } from '../../shared/functions';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: ${remcalc(16)};
  right: ${remcalc(16)};

  ${typography.libreFranklin};
  ${typography.normal};
`;

export default Baseline(
  ButtonIcon
);
