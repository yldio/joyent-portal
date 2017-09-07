import { Grid } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';

export default Grid.extend`
  padding-top: ${remcalc(19)};
  ${isNot('plain')`
    flex: 1 1 auto;
    display: block;
    flex-flow: column;
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
