import remcalc from 'remcalc';
import Header from '../header';

export default Header.extend`
  background-color: rgba(241, 241, 241, 1);
  border-top: ${remcalc(1)} solid ${props => props.theme.grey};

  height: ${remcalc(70)};
  max-height: ${remcalc(70)};
`;
