import whisker from 'chartjs-chart-box-plot';
import styled from 'styled-components';
import buildArray from 'build-array';
import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import Chart from 'chart.js';
import React from 'react';

whisker(Chart);

const Container = styled.div`
  position: relative;
  height: ${remcalc(72)};
  width: 100%;
`;

const Canvas = styled.canvas`
  position: absolute;
  bottom: 0;
`;

class Graph extends React.Component {
  componentDidMount() {
    const {
      data = [],
      labels = 0,
      max = 100,
      min = 0
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels || data.length).map((v, i) => '')
      : labels;

    this._chart = new Chart(this._refs.component, {
      type: 'whisker',
      responsive: true,
      maintainAspectRatio: true,
      options: {
        scales: {
          xAxes: [{
            display: false,
            barPercentage: 1.0,
            categoryPercentage: 1.0
          }],
          yAxes: [{
            display: false,
            ticks: {
              min: min,
              max: max
            }
          }]
        },
        legend: {
          display: false
        }
      },
      data: {
        labels: _labels,
        datasets: [{
          data
        }]
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      data = [],
      labels = 0
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels || data.length).map((v, i) => '')
      : labels;

    this._chart.data.datasets = [{
      data
    }];

    this._chart.data.labels = _labels;
    this._chart.update(0);
  }
  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }
  render() {
    return (
      <Container>
        <Canvas
          innerRef={this.ref('component')}
        />
      </Container>
    );
  }
}

Graph.propTypes = {
  data: React.PropTypes.array,
  labels: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number
};

export default Baseline(
  Graph
);
