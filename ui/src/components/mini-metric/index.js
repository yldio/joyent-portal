const React = require('react');
const Styled = require('styled-components');
const constants = require('../../shared/constants');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

const buildArray = require('build-array');
const Chart = require('chart.js');
const whisker = require('chartjs-chart-box-plot');

whisker(Chart);

const StyledDiv = styled.div`
  height: 127px;
  width: 158px;
  background-color: ${colors.miniBackground};
  border: solid 1px ${colors.borderSecondary};

  &::before {
    position: absolute;
    z-index: 1;
    width: 9px;
    height: 127px;
    background-image:
      linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(216, 216, 216, 0));
    content: '';
  }
`;

const Devider = styled.div`
  width: 158px;
  height: 1px;
  background-color: ${colors.seperator}
`;

const TextMetric = styled.div`
  height: 38px;
  padding: 8px 12px;
`;

const InnerTextBox = styled.div`
  width: 136px;
  height: 36px;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 18px;
  text-align: right;
  color: ${colors.regular};

  & p {
    margin: 0;
  }

  & h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.29;
    color: ${colors.semibold};
  }
`;

const StyledCanvas = styled.canvas`
`;

class MiniMetric extends React.Component {
  componentDidMount() {
    const {
      datasets = [],
      labels = 0,
      max = 100,
      min = 0
    } = this.props;

    const _labels = !Array.isArray(labels)
      ? buildArray(labels).map((v, i) => '')
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
        datasets: datasets
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      datasets = [],
      labels = 0
    } = this.props;

    this._chart.data.datasets = datasets;
    this._chart.data.labels = buildArray(labels).map((v, i) => '');
    this._chart.update(0);
  }
  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }
  render() {
    const {
      name,
    } = this.props;

    return (
      <StyledDiv>
        <TextMetric>
          <InnerTextBox>
            <h3>{name}: 54%</h3>
            <p>(1280/3000 MB)</p>
          </InnerTextBox>
        </TextMetric>
        <Devider />
        <StyledCanvas
          height='72'
          innerRef={this.ref('component')}
          width='157'
        />
      </StyledDiv>
    );
  }
}

MiniMetric.propTypes = {
  datasets: React.PropTypes.array,
  labels: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
  name: React.PropTypes.string,
};

module.exports = MiniMetric;
