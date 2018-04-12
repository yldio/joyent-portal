import emotion from 'preact-emotion';
import remcalc from 'remcalc';

import { Category } from './service';

export const Place = emotion(Category)`
  margin-bottom: ${remcalc(10)};
`;

export const Region = emotion('h6')`
  margin: ${remcalc(6)} 0;

  font-size: ${remcalc(13)};
  line-height: ${remcalc(18)};
  font-weight: ${props => props.theme.font.weight.normal};
  color: #494949;
`;

export { Name as default } from './service';
