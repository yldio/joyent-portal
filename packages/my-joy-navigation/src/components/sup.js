import emotion from 'preact-emotion';
import remcalc from 'remcalc';

export default emotion('sup')`
  position: absolute;
  margin-left: ${remcalc(6)};
  font-weight: ${props => props.theme.font.weight.semibold};
  line-height: normal;
  font-size: ${remcalc(8)};
  color: ${props => (props.new ? props.theme.orange : props.theme.primary)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
