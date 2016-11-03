const data = [
  {
    type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
    x: [1, 2, 3],     // more about "x": #scatter-x
    y: [6, 2, 3],     // #scatter-y
    marker: {         // marker is an object, valid marker keys: #scatter-marker
      color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
    }
  },
  {
    type: 'bar',      // all "bar" chart attributes: #bar
    x: [1, 2, 3],     // more about "x": #bar-x
    y: [6, 2, 3],     // #bar-y
    name: 'bar chart example' // #bar-name
  }
];

module.exports = data;
