import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import remcalc from 'remcalc';

import theme from '../theme';
import FormLabel from '../form/label';
import {
  sliderStyles,
  disabledStyles,
  trackStyles,
  activeStyles,
  rangeStyles
} from './inputStyles';

const SliderStyled = styled.div`
  .input-range {
    ${rangeStyles};
  }

  .slider {
    ${sliderStyles};
  }
  .disabled {
    ${disabledStyles};
  }

  .min,
  .max {
    display: none;
  }

  .value {
    top: ${remcalc(8)};
    position: absolute;

    .label-container {
      font-weight: 600;
      font-size: ${remcalc(10)};
      color: ${theme.secondary};
      left: -50%;
      position: relative;
    }
  }

  .track {
    ${trackStyles};
  }

  .active-track {
    ${activeStyles};
  }
`;

const Label = styled(FormLabel)`
  margin-bottom: ${remcalc(10)};
  margin-top: ${remcalc(12)};
`;

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minValue: this.props.minValue,
      maxValue: this.props.maxValue,
      value: this.props.value
    };

    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(value) {
    this.setState({ value }, () => this.props.onChange(value));
  }

  render() {
    const { minValue, maxValue, value } = this.state;
    const { children, ...rest } = this.props;
    return (
      <SliderStyled>
        <Label>{children}</Label>
        <InputRange
          {...rest}
          minValue={minValue}
          maxValue={maxValue}
          value={value}
          onChange={value => this.changeValue(value)}
        />
      </SliderStyled>
    );
  }
}

Slider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.shape()]),
  onChangeComplete: PropTypes.func,
  onChange: PropTypes.func,
  formatLabel: PropTypes.func,
  ariaLabelledby: PropTypes.string,
  ariaControls: PropTypes.string,
  classNames: PropTypes.shape({
    activeTrack: PropTypes.string,
    disabledInputRange: PropTypes.string,
    inputRange: PropTypes.string,
    labelContainer: PropTypes.string,
    maxLabel: PropTypes.string,
    minLabel: PropTypes.string,
    slider: PropTypes.string,
    sliderContainer: PropTypes.string,
    track: PropTypes.string,
    valueLabel: PropTypes.string
  }),
  disabled: PropTypes.bool,
  draggableTrack: PropTypes.bool,
  onChangeStart: PropTypes.func,
  children: PropTypes.node
};

Slider.defaultProps = {
  onChangeComplete: () => {},
  onChange: () => {},
  formatLabel: value =>
            (value.toString().split('.')[1] || []).length > 3
              ? Math.round(value).toFixed(3)
              : value,
  onChangeStart: () => {},
  step: 1,
  classNames: {
    activeTrack: 'active-track',
    disabledInputRange: 'disabled-range',
    inputRange: 'input-range',
    labelContainer: 'label-container',
    maxLabel: 'max',
    minLabel: 'min',
    sliderContainer: 'slider-container',
    track: 'track',
    valueLabel: 'value',
    slider: 'slider'
  }
};

export default Slider;
