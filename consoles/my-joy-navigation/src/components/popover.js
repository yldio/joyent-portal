import emotion from 'preact-emotion';
import remcalc from 'remcalc';

export default emotion('div')`
    min-width: ${remcalc(180)};
    right: ${remcalc(12)};
    top: ${remcalc(46)};
    display: flex;
    justify-content: start;
    position: absolute;
    padding: ${remcalc(12)};
    z-index: 20;
    border-radius: ${remcalc(4)};
    background: ${props => props.theme.white};
    border: ${remcalc(1)} solid ${props => props.theme.grey};
    box-sizing: border-box;
    box-shadow: 0 ${remcalc(2)} ${remcalc(4)} rgba(0, 0, 0, 0.05);

    &:after {
      position: absolute;
      content: '';
      top: ${remcalc(-6)};
      right: ${remcalc(12)};
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 ${remcalc(4.5)} ${remcalc(6)} ${remcalc(4.5)};
      border-color: transparent transparent ${props =>
        props.theme.white} transparent;
    }

    &:before {
      position: absolute;
      content: '';
      top: ${remcalc(-7)};
      right: ${remcalc(11)};
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 ${remcalc(5.5)} ${remcalc(7)} ${remcalc(5.5)};
      border-color: transparent transparent ${props =>
        props.theme.grey} transparent;
    }
`;
