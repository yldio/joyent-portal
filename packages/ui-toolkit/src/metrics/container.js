import { Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import remcalc from 'remcalc';

export default styled(Col)`
  position: relative;
  border-left: ${remcalc(1)} solid #d8d8d8;
  padding-top: ${remcalc(20)};
`;
