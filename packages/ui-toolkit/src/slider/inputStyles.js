import { css } from 'styled-components';
import remcalc from 'remcalc';

import theme from '../theme';

export const sliderStyles = css`
  appearance: none;
  background: ${theme.white};
  border: 2px solid ${theme.greyLight};
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: ${remcalc(14)};
  width: ${remcalc(14)};
  transform: translateY(-50%) translateX(-50%);
  outline: none;
  position: absolute;
  top: 50%;
  margin-top: ${remcalc(2)};

  &::active {
    transform: scale(1.3);
  }

  &::focus {
    box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2);
  }
`;

export const disabledStyles = css`
  .track {
    background: ${theme.grey};
  }
  .slider {
    background: ${theme.greyDark};
    border: 1px solid ${theme.greyDark};
    box-shadow: none;
    transform: none;
  }
`;

export const trackStyles = css`
  background: ${theme.grey};
  cursor: pointer;
  display: block;
  height: ${remcalc(4)};
  position: relative;
`;

export const activeStyles = css`
  background: ${theme.blue};
  height: 100%;
  position: absolute;
`;

export const rangeStyles = css`
  position: relative;
  width: calc(100% - 18px);
  margin: auto;
  min-height: ${remcalc(10)};
`;
