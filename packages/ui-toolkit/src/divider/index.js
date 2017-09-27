import styled from 'styled-components';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import is from 'styled-is';

import Baseline from '../baseline';

const Divider = styled(Row)`
  background-color: ${props => props.theme.grey};

  ${is('transparent')`
    background-color: transparent;
  `};

  height: ${remcalc(1)};
  margin: 0;
`;

export default Baseline(Divider);
