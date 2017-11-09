import styled from 'styled-components';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import is from 'styled-is';

import Baseline from '../baseline';

const Divider = styled(Row)`
  background-color: ${props => props.theme.grey};
  margin: 0;

  ${is('transparent')`
    background-color: transparent;
  `};
`;

export default Baseline(Divider);
