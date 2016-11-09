const buildArray = require('build-array');
const Chart = require('chart.js');
const React = require('react');

// borderSkipped
// patch `.draw` to support `borderSkipped`:
// Chart.elements.Rectangle.prototype.draw = function() {
//   var ctx = this._chart.ctx;
//   var vm = this._view;
// 
//   var halfWidth = vm.width / 2,
//     leftX = vm.x - halfWidth,
//     rightX = vm.x + halfWidth,
//     top = vm.base - (vm.base - vm.y),
//     halfStroke = vm.borderWidth / 2;
// 
//   // Canvas doesn't allow us to stroke inside the width so we can
//   // adjust the sizes to fit if we're setting a stroke on the line
//   if (vm.borderWidth) {
//     leftX += halfStroke;
//     rightX -= halfStroke;
//     top += halfStroke;
//   }
// 
//   ctx.beginPath();
//   ctx.fillStyle = vm.backgroundColor;
//   ctx.strokeStyle = vm.borderColor;
//   ctx.lineWidth = vm.borderWidth;
// 
//   var borderSkipped = !Array.isArray(vm.borderSkipped)
//     ? [vm.borderSkipped]
//     : vm.borderSkipped;
// 
//   // Corner points, from bottom-left to bottom-right clockwise
//   // | 1 2 |
//   // | 0 3 |
//   var corners = [
//     [leftX, vm.base, (borderSkipped.indexOf('bottom') >= 0), 'bottom'],
//     [leftX, top, (borderSkipped.indexOf('left') >= 0), 'left'],
//     [rightX, top, (borderSkipped.indexOf('top') >= 0), 'top'],
//     [rightX, vm.base, (borderSkipped.indexOf('right') >= 0), 'right']
//   ];
// 
//   function cornerAt(index) {
//     return corners[index % 4];
//   }
// 
//   // Draw rectangle from 'startCorner'
//   var corner = cornerAt(0);
//   ctx.moveTo(corner[0], corner[1]);
// 
//   for (var i = 1; i < 5; i++) {
//     corner = cornerAt(i);
//     ctx.lineTo(corner[0], corner[1]);
// 
//     if (!corner[2]) {
//       ctx.stroke();
//     }
//   }
// 
//   console.log(corners);
// 
//   ctx.fill();
// };

module.exports = React.createClass({
  ref: function(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  },
  fromData: function(data) {
    return (data || []).map((d) => {
      return d.cpu;
    });
  },
  componentDidMount: function() {
    const {
      data = [],
      bg,
      border
    } = this.props;

    const bars = this.fromData(data);

    this._chart = new Chart(this._refs.component, {
      type: 'bar',
      options: {
        elements: {
          rectangle: {
            borderSkipped: ['bottom', 'left', 'right']
          }
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      },
      data: {
        labels: buildArray(bars.length).map((v, i) => ''),
        datasets: [{
          borderWidth: 1,
          borderColor: border,
          backgroundColor: bg,
          data: bars
        }]
      }
    });
  },
  componentWillReceiveProps: function(nextProps) {
    const {
      data = [],
      bg,
      border
    } = this.props;

    const bars = this.fromData(data);

    this._chart.data.labels = buildArray(bars.length).map((v, i) => '');
    this._chart.data.datasets[0].backgroundColor = bg;
    this._chart.data.datasets[0].borderColor = border;
    this._chart.data.datasets[0].data = bars;

    this._chart.update(0);
  },
  render: function() {
    return (
      <canvas
        ref={this.ref('component')}
        width='400'
        height='400'
      />
    );
  }
});
