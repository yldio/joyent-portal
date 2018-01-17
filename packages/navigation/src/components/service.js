import emotion from 'preact-emotion';
import remcalc from 'remcalc';

export const Category = emotion('h4')`
  font-size: ${remcalc(15)};
  line-height: ${remcalc(24)};
  font-weight: ${props => props.theme.font.weight.semibold};
  padding-bottom: ${remcalc(6)};
  color: #979797;
  border-bottom: ${remcalc(1)} solid #f7f7f7;
  margin: 0 0 ${remcalc(22)} 0;
`;

export const Name = emotion(Category)`
  font-size: ${remcalc(15)};
  line-height: ${remcalc(24)};
  font-weight: ${props => props.theme.font.weight.semibold};
  color: #494949;
  border-bottom: none;
  padding-bottom: 0;
  margin: 0;
`;

export const Description = emotion('h6')`
  font-size: ${remcalc(13)};
  line-height: ${remcalc(18)};
  font-weight: ${props => props.theme.font.weight.normal};
  color: #979797;
  margin: 0;
`;

export default emotion('a')`
  display: block;
  margin-bottom: ${remcalc(22)};
`;
