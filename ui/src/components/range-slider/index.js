const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  baseBox
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
  background: ${colors.brandPrimary};
  cursor: pointer;
  height: ${remcalc(6)};
  width: 100%;

  ${baseBox({
    radius: remcalc(25)
  })}
`;

const rangeThumb = css`
  -webkit-appearance: none;
  background: #FFFFFF;
  cursor: pointer;
  height: ${remcalc(24)};
  position: relative;
  top: -10px;
  width: ${remcalc(36)};

  ${baseBox()}
`;

const rangeLower = css`
  background: ${colors.brandPrimary};
  height: 6px;

  ${baseBox({
    radius: remcalc(50),
    border: 'none'
  })}
`;

const rangeUpper = css`
  background: #E6E6E6;
  height: 6px;

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
    background: ${colors.brandPrimary};
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
}) => {
  return (
    <StyledRange
      className={className}
      onChange={onChange}
      style={style}
      type='range'
    />
  );
};

RangeSlider.propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
};

module.exports = RangeSlider;
