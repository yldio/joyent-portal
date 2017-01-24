const React = require('react');
const Styled = require('styled-components');
const moment = require('moment');
const Chart = require('chart.js');
const whisker = require('chartjs-chart-box-plot');

whisker(Chart);

const {
  default: styled
} = Styled;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Canvas = styled.canvas`

`;

class Graph extends React.Component {

  componentDidMount() {
    const {
      yMax = 100,
      yMin = 0,
      yMeasurement = '%'
    } = this.props;

    const {
      data,
      xMax,
      xMin,
      xUnitStepSize
    } = this.processData(this.props);

    this._chart = new Chart(this._refs.component, {
      type: 'whisker',
      responsive: true,
      maintainAspectRatio: true,
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
            display: true,
            type: 'time',
            time: {
              unit: 'minute',
              unitStepSize: xUnitStepSize,
              max: xMax,
              min: xMin,
              displayFormats: {
                hour: 'MMM D, hA'
              }
            },
          }],
          yAxes: [{
            display: true,
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
      },
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
      data = [],
      duration = 360
    } = props;
    // I'm going to assume that data will be structured in 10min intervals...
    // And that newest data will be at the end...
    // Let's rock and roll!
    // All this shizzle below needs to be recalculated on new props, yay!
    const now = moment();
    // first time on scale x
    const before = moment().subtract(duration, 'minutes');
    // remove leading data before first time on scale x
    let dataWithTime = [];
    if(data && data.length) {
      const totalData = data.slice(data.length - 1 - duration/10);
      // adjust time of first data, if there's less data than would fill the chart
      const start = moment(before)
        .add(duration - (totalData.length-1)*10, 'minutes');
      // add times to data
      dataWithTime = totalData.map((d, i) => {
        const add = i*10;
        return Object.assign(
          {},
          d,
          {
            x: moment(start).add(add, 'minutes').toDate()
          }
        );
      });
    }

    // set min and max
    const xMax = now.toDate();
    const xMin = before.toDate();
    // calculate stepsize
    const xUnitStepSize = duration/6;

    return {
      data: dataWithTime,
      xMax,
      xMin,
      xUnitStepSize
    };
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }

  render() {

    return (
      <Container name='metric-body'>
        <Canvas
          height={262}
          innerRef={this.ref('component')}
          width={940}
        />
      </Container>
    );
  }
}

Graph.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  duration: React.PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  yMax: React.PropTypes.number,
  yMeasurement: React.PropTypes.string,
  yMin: React.PropTypes.number
};

module.exports = Graph;
