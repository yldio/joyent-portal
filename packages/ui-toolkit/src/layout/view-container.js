import is from 'styled-is';
import { Grid } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

import { styled as breakpoints } from '../breakpoints';

export default Grid.extend`
  ${breakpoints.smallOnly`
    padding-left: ${remcalc(6)};
    padding-right: ${remcalc(6)};
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
