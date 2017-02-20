const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  baseBox,
  Baseline
} = composers;

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

const rangeTrack = css`
  background: ${colors.base.primary};
  cursor: pointer;
  height: ${remcalc(6)};
  width: 100%;

  ${baseBox({
    radius: remcalc(25)
  })}
`;

const rangeThumb = css`
  -webkit-appearance: none;
  background: ${colors.base.white};
  cursor: pointer;
  height: ${remcalc(24)};
  position: relative;
  top: ${remcalc(-10)};
  width: ${remcalc(36)};

  ${baseBox()}
`;

const rangeLower = css`
  background: ${colors.base.primary};
  height: ${remcalc(6)};

  ${baseBox({
    radius: remcalc(50),
    border: 'none'
  })}
`;

const rangeUpper = css`
  background: #E6E6E6;
  height: ${remcalc(6)};

  ${baseBox({
    radius: remcalc(50)
  })}
`;

const StyledRange = styled.input`
  -webkit-appearance: none;
  border: none;
  box-shadow: none;
  display: block;
  margin: ${remcalc('10 0')};
  visibility: visible;
  width: 100%;

  &::-moz-focus-outer {
    border: 0;
  }

  &::-moz-range-track {
    ${rangeTrack}
  }

  &::-ms-track {
    ${rangeTrack}
  }

  &::-webkit-slider-runnable-track {
    ${rangeTrack}
  }

  &::-moz-range-thumb {
    ${rangeThumb}
  }

  &::-ms-thumb {
    ${rangeThumb}
  }

  &::-webkit-slider-thumb {
    ${rangeThumb}
  }

  &::-moz-range-progress {
    ${rangeLower}
  }

  &::-ms-fill-lower {
    ${rangeLower}
  }

  &::-ms-fill-upper {
    ${rangeUpper}
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-runnable-track {
    background: ${colors.primary};
  }

  &:focus::-ms-fill-lower {
    ${rangeLower}
  }

  &:focus::-ms-fill-upper {
    ${rangeUpper}
  }
`;

const RangeSlider = ({
  className,
  onChange,
  style
}) => (
  <StyledRange
    className={className}
    onChange={onChange}
    style={style}
    type='range'
  />
);

RangeSlider.propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
};

module.exports = Baseline(
  RangeSlider
);
