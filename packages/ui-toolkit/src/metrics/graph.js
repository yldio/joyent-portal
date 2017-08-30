import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import moment from 'moment';

// colours to come from theme
// AJ to supply friendly colours - these were nicked from chartjs utils
const chartColors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

// TODO DISPLAY TIMES SHOULD NOT BE UTC
class MetricGraph extends Component {
  componentDidMount() {
    const { xMin, xMax, datasets } = this.processProps(this.props);
    const { displayX = false, displayY = false } = this.props;

    const config = {
      type: 'line',
      data: { datasets },
      options: {
        responsive: true, // this needs to be played with
        legend: {
          display: false
        },
        tooltip: {
          display: false // this config doesn't seem to work???
        },
        scales: {
          xAxes: [
            {
              display: displayX, // config for mini should be false
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'minute', // this also needs to be played with
                min: xMin,
                max: xMax
              }
            }
          ],
          yAxes: [
            {
              display: displayY // needs min / max and measurement
            }
          ]
        }
      }
    };

    const ctx = this._refs.chart.getContext('2d');
    this._chart = new Chart(ctx, config);
  }

  processProps(props) {
    const { metricsData, graphDurationSeconds } = props;

    const xMax = metricsData[0].end;
    const xMin = moment
      .utc(xMax)
      .subtract(graphDurationSeconds, 'seconds')
      .utc()
      .format();

    const datasets = metricsData.map((data, i) => ({
      fill: false,
      borderColor: chartColors[i],
      data: this.truncateAndConvertMetrics(data.metrics, xMin, xMax)
    }));

    return {
      xMax,
      xMin,
      datasets
    };
  }

  truncateAndConvertMetrics(metrics, xMin, xMax) {
    const xMinMoment = moment.utc(xMin);

    return metrics.reduce((metrics, metric) => {
      const diff = moment.utc(metric.time).diff(xMinMoment);
      if (diff > -10000) {
        // diff comparison is less than zero - otherwise no data for beginning of chart - bug or charjs weirdness?
        metrics.push({
          x: metric.time,
          y: metric.value // value should be converted here to a readable format
        });
      }
      return metrics;
    }, []);
  }

  componentWillReceiveProps(nextProps) {
    const { xMin, xMax, datasets } = this.processProps(nextProps);

    this._chart.data.datasets = datasets;
    // these need to be set, but don't seem to truncate the data that's displayed
    this._chart.options.scales.xAxes[0].time.max = xMax;
    this._chart.options.scales.xAxes[0].time.min = xMin;
    this._chart.update(0);
  }

  // should not rerender ever, we update only the canvas via chartjs
  shouldComponentUpdate() {
    return false;
  }

  ref(name) {
    this._refs = this._refs || {};

    return el => {
      this._refs[name] = el;
    };
  }

  render() {
    const { width, height } = this.props;

    return <canvas ref={this.ref('chart')} width={width} height={height} />;
  }
}

MetricGraph.propTypes = {
  metricsData: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  graphDurationSeconds: PropTypes.number.isRequired // 'width' of graph, i.e. total duration of time it'll display and truncate data to
};

export default MetricGraph;
