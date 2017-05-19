import styled from 'styled-components';
import React from 'react';
import Chart from 'chart.js';
import randomColor from 'randomcolor';


import GraphOptions from './graph-options';
import fillBetweenLinesPlugin from './fill-between-line-plugin';

const Container = styled.div``;

class LineMetric extends React.Component {

  static propTypes = {
    colored: React.PropTypes.bool,
    dataSets: React.PropTypes.object
  };

  constructor(props) {
    super(props)
    self = this;
  }

  componentDidMount() {
    this._chart = new Chart(this._refs.component, {
      type: 'line',
      options: GraphOptions(this.getDataSets()),
      data: {
        labels: this.getDataSets()[0].labels, // Only need to get the [0] timestamps
        datasets: this.getDataSets().map( set => set.data)
      }
    });

    // Hook into main event handler
//    const parentEventHandler = Chart.Controller.prototype.eventHandler;
//
//    Chart.Controller.prototype.eventHandler = function() {
//      const ret = parentEventHandler.apply(this, arguments);
//
//      const {
//        x
//      } = arguments[0];
//
//      this.clear();
//      this.draw();
//      this.chart.ctx.beginPath();
//      this.chart.ctx.moveTo(x, 30);
//      this.chart.ctx.strokeStyle = self.opacityCol();
//      this.chart.ctx.lineTo(x, 340);
//      this.chart.ctx.stroke();
//
//      return ret;
//    };
  }

  opacityCol(op = 1) {
    return `rgba(54, 74, 205, ${op}`;
  }

  getDataSets() {
    Chart.pluginService.register(fillBetweenLinesPlugin);

    const {
      dataSets,
      colored,
      type
    } = this.props;


    const data = (metric) => {
      const color = colored ? this.opacityCol(1) : randomColor();
      const fillBetweenSet   = metric === 'median' || metric === 'third_quartile'
																? 1 : 0;
      const fillBetweenColor = metric === 'median' || metric === 'third_quartile'
																? self.opacityCol(0.2)
																: 'transparent';

      return {
        labels: dataSets[type][metric].map( (d, i) =>d[0]),
        data: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderColor: self.opacityCol(),
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          label: metric,
          data: dataSets[type][metric].map((d, i) => ({
            x: d[0],
            y: d[1]
          })),
          borderColor: color,
          fillBetweenSet,
          fillBetweenColor
        }
      };
    };

    return Object.keys(dataSets[type]).map( (metric, i) => {

      return data(metric)
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
