import remcalc from 'remcalc';
import Small from '../text/small';

export default Small.extend`
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${remcalc(20)};
  border-bottom: ${remcalc(1)} solid #d8d8d8;

  font-size: ${remcalc(13)};
  text-align: center;
  color: #494949;
`;
