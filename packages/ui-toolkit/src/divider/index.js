import styled from 'styled-components';
import { Row } from 'joyent-react-styled-flexboxgrid';
import is from 'styled-is';

const Divider = styled(Row)`
  background-color: ${props => props.theme.grey};

  ${is('transparent')`
    background-color: transparent;
  `};

  ${is('vertical')`
    transform: rotate(90deg);
  `};

  ${is('error')`
    background-color: ${props => props.theme.red};
  `};
`;

export default Divider;
