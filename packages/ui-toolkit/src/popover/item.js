import remcalc from 'remcalc';

import { H4 } from '../text/headings';

export default H4.extend`
  font-size: ${remcalc(16)};
  text-align: left;

  font-style: normal;
  font-weight: normal;
  line-height: normal;

  cursor: pointer;
  color: ${props => props.theme.secondary};

  &:hover {
    color: ${props => props.theme.secondaryActive};
  }
`;
