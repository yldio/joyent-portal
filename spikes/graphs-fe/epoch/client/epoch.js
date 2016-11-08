// injects into `window` (ikr)
require('epoch-charting');

const ReactRedux = require('react-redux');
const React = require('react');

const {
  // Chart: {
  //   Bar
  // }
  Time: {
    Bar
  }
} = window.Epoch;

const {
  connect
} = ReactRedux;

const style = {
  height: '220px'
};

const EpochGraph = React.createClass({
  ref: function(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  },
  fromData: function(data) {
    return (data || []).map((d) => {
      return {
        y: d.cpu,
        time: d.when
      };
    });
  },
  componentDidMount: function() {
    this.chart = new Bar({
      el: this._refs.component,
      type: 'time.bar',
      data: [{
        label: 'A',
        values: []
      }]
    });


    // {
    //   time: 1478605670,
    //   y: 2
    // }, {
    //   time: 1478605671,
    //   y: 1.9876883405951378
    // }, {
    //   time: 1478605672,
    //   y: 1.9510565162951536
    // }, {
    //   time: 1478605673,
    //   y: 1.8910065241883678
    // }, {
    //   time: 1478605674,
    //   y: 1.8090169943749475
    // }, {
    //   time: 1478605675,
    //   y: 1.7071067811865475
    // }, {
    //   time: 1478605676,
    //   y: 1.5877852522924731
    // }, {
    //   time: 1478605677,
    //   y: 1.4539904997395467
    // }, {
    //   time: 1478605678,
    //   y: 1.3090169943749475
    // }, {
    //   time: 1478605679,
    //   y: 1.156434465040231
    // }, {
    //   time: 1478605680,
    //   y: 1
    // }, {
    //   time: 1478605681,
    //   y: 0.8435655349597694
    // }, {
    //   time: 1478605682,
    //   y: 0.6909830056250527
    // }, {
    //   time: 1478605683,
    //   y: 0.5460095002604533
    // }, {
    //   time: 1478605684,
    //   y: 0.412214747707527
    // }, {
    //   time: 1478605685,
    //   y: 0.29289321881345254
    // }, {
    //   time: 1478605686,
    //   y: 0.19098300562505266
    // }, {
    //   time: 1478605687,
    //   y: 0.10899347581163221
    // }, {
    //   time: 1478605688,
    //   y: 0.04894348370484647
    // }, {
    //   time: 1478605689,
    //   y: 0.01231165940486234
    // }, {
    //   time: 1478605690,
    //   y: 0
    // }, {
    //   time: 1478605691,
    //   y: 0.01231165940486223
    // }, {
    //   time: 1478605692,
    //   y: 0.04894348370484625
    // }, {
    //   time: 1478605693,
    //   y: 0.1089934758116321
    // }, {
    //   time: 1478605694,
    //   y: 0.19098300562505255
    // }, {
    //   time: 1478605695,
    //   y: 0.2928932188134523
    // }, {
    //   time: 1478605696,
    //   y: 0.41221474770752675
    // }, {
    //   time: 1478605697,
    //   y: 0.546009500260453
    // }, {
    //   time: 1478605698,
    //   y: 0.6909830056250524
    // }, {
    //   time: 1478605699,
    //   y: 0.8435655349597689
    // }, {
    //   time: 1478605700,
    //   y: 0.9999999999999998
    // }, {
    //   time: 1478605701,
    //   y: 1.1564344650402307
    // }, {
    //   time: 1478605702,
    //   y: 1.3090169943749472
    // }, {
    //   time: 1478605703,
    //   y: 1.4539904997395467
    // }, {
    //   time: 1478605704,
    //   y: 1.587785252292473
    // }, {
    //   time: 1478605705,
    //   y: 1.7071067811865475
    // }, {
    //   time: 1478605706,
    //   y: 1.8090169943749475
    // }, {
    //   time: 1478605707,
    //   y: 1.8910065241883678
    // }, {
    //   time: 1478605708,
    //   y: 1.9510565162951536
    // }, {
    //   time: 1478605709,
    //   y: 1.9876883405951378
    // }


    // this.chart = new Bar({
    //   el: this._refs.component,
    //   data: [{
    //     values: [{
    //       x: 'A',
    //       y: 20
    //     }, {
    //       x: 'B',
    //       y: 39
    //     }, {
    //       x: 'C',
    //       y: 8
    //     }, ]
    //   }]
    // });
  },
  componentWillReceiveProps: function(nextProps) {
    this.fromData(this.props.data).forEach((r) => this.chart.push([r]));
  },
  render: function() {
    return (
      <div
        style={style}
        className='epoch epoch-theme-default category20'
        ref={this.ref('component')}
      />
    );
  }
});

const mapStateToProps = ({
  data
}) => {
  return {
    data
  };
};

module.exports = connect(mapStateToProps)(EpochGraph);
