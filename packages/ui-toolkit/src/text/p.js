import typography from '../typography';
import styled from 'styled-components';
import remcalc from 'remcalc';

export default styled.p`
  ${typography.fontFamily};
  ${typography.normal};

  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
`;
