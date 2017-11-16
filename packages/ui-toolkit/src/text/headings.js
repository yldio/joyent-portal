import styled from 'styled-components';
import { H1 as NH1 } from 'normalized-styled-components';
import remcalc from 'remcalc';
import typography from '../typography';

export const H1 = NH1.extend`
  margin: 0;
  ${typography.color};
  ${typography.fontFamily};
  ${typography.normal};

  font-size: ${remcalc(36)};
  line-height: ${remcalc(45)};
  font-style: normal;
  font-stretch: normal;

  & + p,
  & + small,
  & + h1,
  & + h2,
  & + label,
  & + h3,
  & + h4,
  & + h5,
  & + div,
  & + span {
    margin-top: ${remcalc(24)};
  }
`;

export const H2 = styled.h2`
  margin: 0;
  ${typography.color};
  ${typography.fontFamily};
  ${typography.normal};
  line-height: ${remcalc(30)};
  font-size: ${remcalc(24)};

  & + p,
  & + small,
  & + h1,
  & + h2,
  & + label,
  & + h3,
  & + h4,
  & + h5,
  & + div,
  & + span {
    margin-top: ${remcalc(24)};
  }
`;

export const H3 = styled.h3`
  margin: 0;
  ${typography.color};
  ${typography.fontFamily};
  ${typography.normal};
  line-height: ${remcalc(26)};
  font-size: ${remcalc(21)};

  & + p,
  & + small,
  & + h1,
  & + h2,
  & + label,
  & + h3,
  & + h4,
  & + h5,
  & + div,
  & + span {
    margin-top: ${remcalc(24)};
  }
`;

export const H4 = styled.h4`
  margin: 0;
  ${typography.color};
  ${typography.fontFamily};
  ${typography.semibold};
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};

  & + p,
  & + small,
  & + h1,
  & + h2,
  & + label,
  & + h3,
  & + h4,
  & + h5,
  & + div,
  & + span {
    margin-top: ${remcalc(12)};
  }
`;

export const H5 = styled.h4`
  margin: 0;
  ${typography.color};
  ${typography.fontFamily};
  ${typography.normal};
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};

  & + p,
  & + small,
  & + h1,
  & + h2,
  & + label,
  & + h3,
  & + h4,
  & + h5,
  & + div,
  & + span {
    margin-top: ${remcalc(12)};
  }
`;
