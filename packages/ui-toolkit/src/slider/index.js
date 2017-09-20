import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputRange from './react-input-range';
import remcalc from 'remcalc';

import FormLabel from '../form/label';

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
      <div>
        <Label>{children}</Label>
        <InputRange
          {...rest}
          minValue={minValue}
          maxValue={maxValue}
          value={value}
          onChange={value => this.changeValue(value)}
        />
      </div>
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
  disabled: PropTypes.bool,
  draggableTrack: PropTypes.bool,
  onChangeStart: PropTypes.func,
  children: PropTypes.node,
  greyed: PropTypes.bool,
};

Slider.defaultProps = {
  onChangeComplete: () => {},
  onChange: () => {},
  formatLabel: value =>
    (value.toString().split('.')[1] || []).length > 3
      ? Math.round(value).toFixed(3)
      : value,
  onChangeStart: () => {},
  step: 1
};

export default Slider;
