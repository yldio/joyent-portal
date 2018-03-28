import { css } from 'styled-components';
import remcalc from 'remcalc';

export default ({ background, color, border, arrow }) => css`
  background: ${props => props.theme[background]};
  color: ${props => props.theme[color]};
  -webkit-text-fill-color: currentcolor;
  z-index: 999;

  border-radius: ${remcalc(4)};

  & .${arrow} {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }

  /* top */
  &[data-placement^='top'] .${arrow} {
    border-width: ${remcalc(6)} ${remcalc(6)} 0 ${remcalc(6)};
    border-color: ${props => props.theme[background]} transparent transparent
      transparent;
    bottom: ${remcalc(-6)};

    &:after {
      content: '';
      display: block;
      position: absolute;
      border-width: ${remcalc(7)} ${remcalc(7)} 0 ${remcalc(7)};
      border-color: ${props => props.theme[border]} transparent transparent
        transparent;
      border-style: solid;
      left: ${remcalc(-7)};
      top: ${remcalc(-6)};
      z-index: -1;
    }
  }

  /* bottom */
  &[data-placement^='bottom'] .${arrow} {
    border-width: 0 ${remcalc(6)} ${remcalc(6)} ${remcalc(6)};
    border-color: transparent transparent ${props => props.theme[background]}
      transparent;
    top: ${remcalc(-6)};

    &:after {
      content: '';
      display: block;
      position: absolute;
      border-width: 0 ${remcalc(7)} ${remcalc(7)} ${remcalc(7)};
      border-color: transparent transparent ${props => props.theme[border]}
        transparent;
      border-style: solid;
      top: ${remcalc(-1)};
      left: ${remcalc(-7)};
      z-index: -1;
    }
  }

  &[data-placement='top-start']
    .${arrow},
    &[data-placement='bottom-start']
    .${arrow} {
    left: ${remcalc(6)};
  }

  &[data-placement='top-end']
    .${arrow},
    &[data-placement='bottom-end']
    .${arrow} {
    right: ${remcalc(6)};
  }

  &[data-placement='top'] .${arrow}, &[data-placement='bottom'] .${arrow} {
    left: calc(50% - ${remcalc(11)});
  }

  &[data-placement^='left'] .${arrow} {
    border-width: ${remcalc(6)} 0 ${remcalc(6)} ${remcalc(6)};
    border-color: transparent transparent transparent
      ${props => props.theme[background]};
    right: ${remcalc(-12)};

    &:after {
      content: '';
      display: block;
      position: absolute;
      border-width: ${remcalc(7)} 0 ${remcalc(7)} ${remcalc(7)};
      border-color: transparent transparent transparent
        ${props => props.theme[border]};
      border-style: solid;
      left: ${remcalc(-6)};
      width: 0;
      height: 0;
      top: ${remcalc(-7)};
      z-index: -1;
    }
  }

  &[data-placement^='right'] .${arrow} {
    border-width: ${remcalc(6)} ${remcalc(6)} ${remcalc(6)} 0;
    border-color: transparent ${props => props.theme[background]} transparent
      transparent;
    left: ${remcalc(-12)};

    &:after {
      content: '';
      display: block;
      position: absolute;
      border-width: ${remcalc(7)} ${remcalc(7)} ${remcalc(7)} 0;
      border-color: transparent ${props => props.theme[border]} transparent
        transparent;
      border-style: solid;
      left: ${remcalc(-2)};
      width: 0;
      height: 0;
      top: ${remcalc(-7)};
      z-index: -1;
    }
  }

  /* left & right */
  &[data-placement='left-start']
    .${arrow},
    &[data-placement='right-start']
    .${arrow} {
    top: ${remcalc(6)};
  }

  &[data-placement='left-end']
    .${arrow},
    &[data-placement='right-end']
    .${arrow} {
    bottom: ${remcalc(6)};
  }

  &[data-placement='left'] .${arrow}, &[data-placement='right'] .${arrow} {
    top: calc(50% - ${remcalc(6)});
  }
`;
