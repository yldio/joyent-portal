import React from 'react';
import styled from 'styled-components';
import whisker from 'chartjs-chart-box-plot';
import moment from 'moment';
import Chart from 'chart.js';
import { Baseline } from '../../shared/composers';

whisker(Chart);

const Container = styled.div`
  position: relative;
`;

class Graph extends React.Component {
  componentDidMount() {
    const {
      yMeasurement = '%'
    } = this.props;

    const {
      axes,
      data,
      yMax,
      yMin,
      xMax,
      xMin,
      xUnitStepSize
    } = this.processData(this.props);

    this._chart = new Chart(this._refs.component, {
      type: 'whisker',
      responsive: true,
      maintainAspectRatio: false,
      data: {
        datasets: [{
          data: data
        }]
      },
      options: {
        animation: false,
        layout: {
          padding: 10
        },
        scales: {
          xAxes: [{
            display: axes,
            type: 'time',
            time: {
              unit: 'minute',
              unitStepSize: xUnitStepSize,
              max: xMax,
              min: xMin,
              displayFormats: {
                hour: 'MMM D, hA'
              }
            }
          }],
          yAxes: [{
            display: axes,
            ticks: {
              min: yMin,
              max: yMax,
              callback: (value, index, values) => {
                return value < 10 && value !== 0 ?
                  `${value.toFixed(2)}${yMeasurement}` :
                  `${value}${yMeasurement}`;
              }
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      data,
      xMax,
      xMin,
      xUnitStepSize
    } = this.processData(nextProps);

    this._chart.data.datasets = [{
      data
    }];

    this._chart.options.scales.xAxes[0].time.max = xMax;
    this._chart.options.scales.xAxes[0].time.min = xMin;
    this._chart.options.scales.xAxes[0].time.unitStepSize = xUnitStepSize;

    this._chart.update(0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  processData(props) {
    const {
      data = {},
      axes = false
    } = props;

    const {
      start,
      end,
      interval,
      values,
      max,
      min
    } = data;

    // check whether chartjs needs actual dates...
    const mappedValues = values.map((value) => ({
      ...value,
      x: moment(value.start).toDate()
    }));

    return {
      axes,
      data: mappedValues,
      xMax: moment(end).toDate(),
      xMin: moment(start).toDate(),
      yMax: max,
      yMin: min,
      xUnitStepSize: interval // this is in milliseconds!!!
    };
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }

  render() {

    const {
      width,
      height
    } = this.props;

    return (
      <Container name='metric-body'>
        <canvas
          ref={this.ref('component')}
          width={width}
          height={height}
        />
      </Container>
    );
  }
}

Graph.propTypes = {
  data: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  yMeasurement: React.PropTypes.string
};

export default Baseline(
  Graph
);
