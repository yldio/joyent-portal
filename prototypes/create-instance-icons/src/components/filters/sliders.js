import React, { Component } from 'react';
import { Slider, FormGroup, FormLabel, Input } from 'joyent-ui-toolkit';
import isEqual from 'lodash.isequal';
import { Row, Col } from 'react-styled-flexboxgrid';

const getFirstAndLast = (arr, key) => {
  const sorted = arr.sort(
    (a, b) => (a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : 1)
  );

  if (sorted.length > 0) {
    return {
      min: parseFloat(sorted[0][key]),
      max: parseFloat(sorted[sorted.length - 1][key])
    };
  }
};

const cleanValues = changed =>
  Object.keys(changed).map((key, index) => {
    const stringify = changed[key].toString();
    return stringify.includes('GB') ||
      stringify.includes('MB') ||
      stringify.includes('TB')
      ? changed[key].split(' ')[0]
      : changed[key];
  });

class Sliders extends Component {
  constructor(props) {
    super(props);
    const { filters: { cpu, cost, ram, disk }, reset, groupClick } = this.props;

    this.state = {
      reset,
      ram,
      cpu,
      disk,
      cost,
      groupClick
    };
  }

  handleChange = (e, name, target) => {
    const changed = this.state[name];
    const values = cleanValues(changed);
    const value = parseInt(e.target.value);
    const isToBeDived = name === 'ram' || name === 'disk';

    setTimeout(() => {
      this.props[`${name}SliderChange`]({
        min: isToBeDived ? parseInt(values[0]) / 1000 : parseInt(values[0]),
        max: isToBeDived ? parseInt(values[1]) / 1000 : parseInt(values[0]),
        [target]: isToBeDived ? parseInt(value) / 1000 : parseInt(value)
      });
    }, 2000);

    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [target]: value
      }
    });
  };

  returnValue = (value, name) => {
    const ramValue = value < 1000 ? `${value} MB` : `${value / 1000} GB`;
    const diskValue = value < 1000 ? `${value} GB` : `${value / 1000} TB`;

    if (name === 'ram' || name === 'disk') {
      return name === 'ram' ? ramValue : diskValue;
    }

    return value;
  };

  handleBlur = (e, name, target) => {
    const changed = this.state[name];
    const values = cleanValues(changed);
    const value = parseInt(e.target.value);
    const isToBeDived = name === 'ram' || name === 'disk';
    this.props[`${name}SliderChange`]({
      min: isToBeDived ? parseInt(values[0]) / 1000 : parseInt(values[0]),
      max: isToBeDived ? parseInt(values[1]) / 1000 : parseInt(values[0]),
      [target]: isToBeDived ? parseInt(value) / 1000 : parseInt(value)
    });

    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [target]: this.returnValue(value, name)
      }
    });
  };

  render() {
    const {
      ramSliderChange,
      cpuSliderChange,
      diskSliderChange,
      costSliderChange,
      packages,
      defaults
    } = this.props;

    const { cpu, cost, ram, disk } = this.state;
    return (
      <Row>
        <Col xs={6} sm={3}>
          <FormLabel>RAM</FormLabel>
          <FormGroup flex>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'ram', 'min')}
              onBlur={e => this.handleBlur(e, 'ram', 'min')}
              value={ram.min}
            />
            <span style={{ margin: '0 9px' }}>to</span>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'ram', 'max')}
              onBlur={e => this.handleBlur(e, 'ram', 'max')}
              value={ram.max}
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={3}>
          <FormLabel>Disk</FormLabel>
          <FormGroup flex>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'disk', 'min')}
              onBlur={e => this.handleBlur(e, 'disk', 'min')}
              value={disk.min}
            />
            <span style={{ margin: '0 9px' }}>to</span>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'disk', 'max')}
              onBlur={e => this.handleBlur(e, 'disk', 'max')}
              value={disk.max}
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={3}>
          <FormLabel>vCPUs</FormLabel>
          <FormGroup flex>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'cpu', 'min')}
              onBlur={e => this.handleBlur(e, 'cpu', 'min')}
              value={cpu.min}
            />
            <span style={{ margin: '0 9px' }}>to</span>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'cpu', 'max')}
              onBlur={e => this.handleBlur(e, 'cpu', 'max')}
              value={cpu.max}
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={3}>
          <FormLabel>$/hour</FormLabel>
          <FormGroup flex>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'cost', 'min')}
              onBlur={e => this.handleBlur(e, 'cost', 'min')}
              value={cost.min}
            />
            <span style={{ margin: '0 9px' }}>to</span>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 'cost', 'max')}
              onBlur={e => this.handleBlur(e, 'cost', 'max')}
              value={cost.max}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

// (
//   <Slider
//     greyed={packages.length === 0}
//     minValue={defaults.ram.min}
//     maxValue={defaults.ram.max}
//     step={0.256}
//     value={ram}
//     key={`${ram.min}-${ram.max}`}
//     onChangeComplete={value => ramSliderChange(value)}
//   >
//     GB RAM
//   </Slider>
// ),
//   (
//     <Slider
//       greyed={packages.length === 0}
//       minValue={defaults.cpu.min}
//       maxValue={defaults.cpu.max}
//       step={0.25}
//       value={cpu}
//       key={`${cpu.min}-${cpu.max}`}
//       onChangeComplete={value => cpuSliderChange(value)}
//     >
//       vCPUs
//     </Slider>
//   ),
//   (
//     <Slider
//       greyed={packages.length === 0}
//       minValue={defaults.disk.min}
//       maxValue={defaults.disk.max}
//       step={0.01}
//       value={disk}
//       key={`${disk.min}-${disk.max}`}
//       onChangeComplete={value => diskSliderChange(value)}
//     >
//       TB Disk
//     </Slider>
//   ),
//   (
//     <Slider
//       greyed={packages.length === 0}
//       minValue={defaults.cost.min}
//       maxValue={defaults.cost.max}
//       step={0.016}
//       value={cost}
//       key={`${cost.min}-${cost.max}`}
//       onChangeComplete={value => costSliderChange(value)}
//     >
//       $/hr
//     </Slider>
//   );

export default Sliders;
