import remcalc from 'remcalc';
import Title from './title';

export default Title.extend`
  line-height: 1;
  width: ${remcalc(24)};
  padding-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: none;
`;
