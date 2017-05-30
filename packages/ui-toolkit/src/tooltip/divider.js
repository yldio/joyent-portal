import styled from 'styled-components';
import unitcalc from 'unitcalc';
import { border } from '../boxes';

const TooltipDivider = styled.div`
  border-top: ${border.unchecked};
  margin: ${unitcalc(1)} 0 ${unitcalc(1.5)} 0;
`;

export default TooltipDivider;
