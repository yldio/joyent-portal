import styled from 'styled-components';
import React from 'react';
import Chart from 'chart.js';
import MetricData from './metric-data';
import fillBetweenLinesPlugin from './fill-between-line-plugin';

const Container = styled.div``;

class LineMetric extends React.Component {

  componentDidMount() {

    Chart.pluginService.register(fillBetweenLinesPlugin);

    this._chart = new Chart(this._refs.component, {
      type: 'line',
      data: {
        datasets: [{
          data: MetricData.values.map( d => ({
            x: d.start,
            y: d.median
          })),
          backgroundColor: 'transparent',
          borderColor: 'blue',
          borderWidth: 1,
          label: 'median'
          // fillBetweenSet: 1,
          // fillBetweenColor: "rgba(255,0,0, 0.2)"
        }, {
          data: MetricData.values.map( d => ({
            x: d.start,
            y: d.firstQuartile
          })),
          backgroundColor: 'transparent',
          borderColor: 'green',
          borderWidth: 1,
          label: '1st quartile'
        }, {
          data: MetricData.values.map( d => ({
            x: d.start,
            y: d.thirdQuartile
          })),
          backgroundColor: 'transparent',
          borderColor: 'red',
          borderWidth: 1,
          label: '3rd quartile',
          fillBetweenSet: 1,
          fillBetweenColor: 'rgba(255,0,0, 0.1)'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });
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
        <canvas
          ref={this.ref('component')}
          height={200}
          width={200}
        />
      </Container>
    );
  }
}

export default LineMetric;
