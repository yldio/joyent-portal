const NVD3Chart = require('react-nvd3');
const ReactRedux = require('react-redux');
const React = require('react');

const {
  connect
} = ReactRedux;

const Component = ({
  data
}) => {
  const datum = [{
    key: 'test',
    values: (data || []).map((v, i) => ({
      label: `${i}`,
      value: v.cpu
    }))
  }];

  const context = {
    getColor: (i) => {
      if (i.value > 50) {
        return 'red';
      }

      return 'green';
    }
  };

  const color = {
    name: 'getColor',
    type: 'function'
  };

  return (
    <NVD3Chart
      duration={0}
      context={context}
      color={color}
      type='discreteBarChart'
      datum={datum}
      x='label'
      y='value'
    />
  );
};

const mapStateToProps = ({
  data
}) => {
  return {
    data
  };
};

module.exports = connect(
  mapStateToProps
)(Component);
