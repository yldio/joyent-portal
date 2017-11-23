import { Small } from 'normalized-styled-components';
import remcalc from 'remcalc';

export default Small.extend`
  color: ${props => props.theme.text};

  line-height: ${remcalc(18)};
  font-size: ${remcalc(13)};
  padding-bottom: ${remcalc(12)};
`;
