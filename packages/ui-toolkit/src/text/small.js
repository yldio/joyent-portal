import styled from 'styled-components';
import { Small } from 'normalized-styled-components';
import remcalc from 'remcalc';
import typography from '../typography';

export default styled(Small)`
  ${typography.fontFamily};
  ${typography.normal};

  line-height: ${remcalc(18)};
  font-size: ${remcalc(14)};
`;
