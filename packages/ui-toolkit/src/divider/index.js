import styled from 'styled-components';
import { Row } from 'joyent-react-styled-flexboxgrid';
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
