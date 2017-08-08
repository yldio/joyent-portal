import styled from 'styled-components';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

export default styled(Row)`
  background-color: ${props => props.theme.grey};
  height: ${remcalc(1)};
  margin: 0;
`;
