import emotion from 'preact-emotion';
import remcalc from 'remcalc';

export default emotion('div')`
  border-bottom: ${remcalc(1)} solid #d8d8d8;

  width: 100%;
  position: absolute;
  z-index: 1;
  top: ${remcalc(48)};
  left: 0;

  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;
