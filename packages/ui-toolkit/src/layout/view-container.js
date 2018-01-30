import { Grid } from 'joyent-react-styled-flexboxgrid';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';

import { styled as breakpoints } from '../breakpoints';

export default Grid.extend`
  box-sizing: border-box;
  width: 100%;

  ${is('fluid')`
    padding-left: 0;
    padding-right: 0;
  `};

  ${isNot('fluid')`
    max-width: ${remcalc(1000)};

    ${breakpoints.smallOnly`
      padding-left: ${remcalc(6)};
      padding-right: ${remcalc(6)};
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
