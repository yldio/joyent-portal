import { Grid } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import { isNot } from 'styled-is';

export default Grid.extend`
  padding-top: ${remcalc(19)};

  ${isNot('plain')`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column;
  `};
`;
