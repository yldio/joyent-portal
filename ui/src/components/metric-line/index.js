import styled from 'styled-components';
import React from 'react';
import Chart from 'chart.js';
import randomColor from 'randomcolor';

import GraphOptions from './graph-options';
import fillBetweenLinesPlugin from './fill-between-line-plugin';

const Container = styled.div``;

class LineMetric extends React.Component {

  getDataSets() {

    const {
      dataSets
    } = this.props;

    Chart.pluginService.register(fillBetweenLinesPlugin);

    const _dataSets = dataSets || DataSetNormal;

    return Object.keys(_dataSets).map( (metric, i) => {
      const color = randomColor();

      return {
        label: metric,
        data: _dataSets[metric].map( (d, i) => ({
          x: d[0],
          y: d[1]
        })),
        backgroundColor: 'transparent',
        borderColor: color,
        borderWidth: 1,
        fillBetweenSet: metric === 'third_quartile' ? 1 : 0,
        fillBetweenColor: metric === 'third_quartile'
          ? 'rgba(54, 74, 205, 0.2)'
          : 'transparent'
      }
    });
  }

  componentDidMount() {

    this._chart = new Chart(this._refs.component, {
      type: 'line',
      data: {
        datasets: this.getDataSets().map( set => set)
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
