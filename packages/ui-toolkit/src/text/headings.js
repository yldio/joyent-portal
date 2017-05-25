import styled from 'styled-components';
import { H1 as NH1 } from 'normalized-styled-components';
import remcalc from 'remcalc';
import typography from '../typography';

export const H1 = NH1.extend`
  ${typography.fontFamily};
  ${typography.medium};

  font-size: ${remcalc(36)};
  font-style: normal;
  font-stretch: normal;
  margin: 0;
`;

export const H2 = styled.h2`
  ${typography.fontFamily};
  ${typography.medium};

  font-size: ${remcalc(24)};
`;

export const H3 = styled.h3`
  ${typography.fontFamily};
  ${typography.medium};

  font-size: ${remcalc(15)};
`;
