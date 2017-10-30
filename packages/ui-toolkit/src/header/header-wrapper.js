import { ViewContainer } from '../layout';
import remcalc from 'remcalc';

export default ViewContainer.extend`
  display: flex;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: stretch;
  max-height: ${remcalc(53)};
  min-height: ${remcalc(53)};
`;
