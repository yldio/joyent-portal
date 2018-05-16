import { Grid } from 'joyent-react-styled-flexboxgrid';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';
import styled from 'styled-components';

import { styled as breakpoints } from '../breakpoints';

export default styled(Grid)`
  box-sizing: border-box;
  width: 100%;

  ${is('fluid')`
    padding-left: 0;
    padding-right: 0;
  `};

  ${isNot('fluid')`
    max-width: ${remcalc(1260)};

    ${breakpoints.smallOnly`
      padding-left: ${remcalc(12)};
      padding-right: ${remcalc(12)};
    `};

    ${breakpoints.mediumOnly`
      padding-left: ${remcalc(30)};
      padding-right: ${remcalc(30)};
    `};

    ${breakpoints.largeOnly`
      padding-left: ${remcalc(70)};
      padding-right: ${remcalc(70)};
    `};
  `};

  ${is('main')`
    padding-bottom: ${remcalc(18)};
  `};

  ${is('center')`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  `};
`;
