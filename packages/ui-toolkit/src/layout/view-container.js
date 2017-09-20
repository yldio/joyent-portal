import is, { isNot } from 'styled-is';
import { Grid } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

export default Grid.extend`
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
