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
      dataSets,
	    colored
    } = this.props;

	  const opacityCol = (op = 1) => `rgba(54, 74, 205, ${op}`;
	  const _dataSets = dataSets || DataSetNormal;
    const dataOptions = {
	    backgroundColor: 'transparent',
	    borderWidth: 1,
//	    pointBackgroundColor: "#fff",
	    pointBorderWidth: 2,
	    pointHoverRadius: 4,
	    pointHoverBorderColor: opacityCol(),
	    pointHoverBorderWidth: 2,
	    pointRadius: 1,
	    pointHitRadius: 10,
    };

    Chart.pluginService.register(fillBetweenLinesPlugin);

    return Object.keys(_dataSets).map( (metric, i) => {

      const color = colored ? opacityCol(1) : randomColor();

      return {
        labels: _dataSets[metric].map( (d, i) =>d[0]),
        data: {
         ...dataOptions,
         label: metric,
         data: _dataSets[metric].map( (d, i) => ({
           x: d[0],
           y: d[1]
         })),
         borderColor: color,
         fillBetweenSet: metric === 'median' || metric === 'third_quartile' ? 1 : 0,
         fillBetweenColor: metric === 'median' || metric === 'third_quartile'
           ? opacityCol(0.2)
           : 'transparent'
        }
      }
    });
  }

  componentDidMount() {
	  Chart.defaults.global.tooltips.enabled = true;

    this._chart = new Chart(this._refs.component, {
      type: 'line',
      data: {
        labels: this.getDataSets()[0].labels,
        datasets: this.getDataSets().map( set => set.data)
      },
      options: GraphOptions
    });
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => this._refs[name] = el;
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
