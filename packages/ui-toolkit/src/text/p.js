import typography from '../typography';
import styled from 'styled-components';
import remcalc from 'remcalc';

export default styled.p`
  ${typography.fontFamily};
  ${typography.normal};
  ${typography.color};

  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
  padding-bottom: ${remcalc(36)};
`;
