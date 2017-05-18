const NVD3Chart = require('react-nvd3');
const React = require('react');

module.exports = ({
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