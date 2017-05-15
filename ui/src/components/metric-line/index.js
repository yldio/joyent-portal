import styled from 'styled-components';
import React from 'react';
import Chart from 'chart.js';

import GraphOptions from './graph-options';
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
          borderColor: '#364ACD',
          borderWidth: 1,
          label: 'median'
        }, {
          data: MetricData.values.map( d => ({
            x: d.start,
            y: d.firstQuartile
          })),
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 1,
          label: '1st quartile'
        }, {
          data: MetricData.values.map( d => ({
            x: d.start,
            y: d.thirdQuartile
          })),
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 1,
          label: '3rd quartile',
          fillBetweenSet: 1,
          fillBetweenColor: 'rgba(54, 74, 205, 0.2)'
        }]
      },
      options: GraphOptions
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
          height={300}
          width={1000}
        />
      </Container>
    );
  }
}

export default LineMetric;
