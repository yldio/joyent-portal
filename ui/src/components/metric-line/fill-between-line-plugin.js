// Courtesy of:
// https://stackoverflow.com/questions/41467923/chart-js-fill-between-two-lines/41733045#41733045

/* eslint-disable */
export default {
  afterDatasetsDraw: function (chart) {
    var ctx = chart.chart.ctx;
    var xaxis = chart.scales['x-axis-0'];
    var yaxis = chart.scales['y-axis-0'];
    var datasets = chart.data.datasets;
    ctx.save();

    for (var d = 0; d < datasets.length; d++) {
      var dataset = datasets[d];
      if (dataset.fillBetweenSet == undefined) {
        continue;
      }

      // get meta for both data sets
      var meta1 = chart.getDatasetMeta(d);
      var meta2 = chart.getDatasetMeta(dataset.fillBetweenSet);

      ctx.beginPath();

      // vars for tracing
      var curr, prev;

      // trace set1 line
      for (var i = 0; i < meta1.data.length; i++) {
        curr = meta1.data[i];
        if (i === 0) {
          ctx.moveTo(curr._view.x, curr._view.y);
          ctx.lineTo(curr._view.x, curr._view.y);
          prev = curr;
          continue;
        }
        if (curr._view.steppedLine === true) {
          ctx.lineTo(curr._view.x, prev._view.y);
          ctx.lineTo(curr._view.x, curr._view.y);
          prev = curr;
          continue;
        }
        if (curr._view.tension === 0) {
          ctx.lineTo(curr._view.x, curr._view.y);
          prev = curr;
          continue;
        }

        ctx.bezierCurveTo(
          prev._view.controlPointNextX,
          prev._view.controlPointNextY,
          curr._view.controlPointPreviousX,
          curr._view.controlPointPreviousY,
          curr._view.x,
          curr._view.y
        );
        prev = curr;
      }


      // connect set1 to set2 then BACKWORDS trace set2 line
      for (var i = meta2.data.length - 1; i >= 0; i--) {
        curr = meta2.data[i];
        if (i === meta2.data.length - 1) {
          ctx.lineTo(curr._view.x, curr._view.y);
          prev = curr;
          continue;
        }
        if (curr._view.steppedLine === true) {
          ctx.lineTo(prev._view.x, curr._view.y);
          ctx.lineTo(curr._view.x, curr._view.y);
          prev = curr;
          continue;
        }
        if (curr._view.tension === 0) {
          ctx.lineTo(curr._view.x, curr._view.y);
          prev = curr;
          continue;
        }

        // reverse bezier
        ctx.bezierCurveTo(
          prev._view.controlPointPreviousX,
          prev._view.controlPointPreviousY,
          curr._view.controlPointNextX,
          curr._view.controlPointNextY,
          curr._view.x,
          curr._view.y
        );
        prev = curr;
      }

      ctx.closePath();
      ctx.fillStyle = dataset.fillBetweenColor || "rgba(0,0,0,0.1)";
      ctx.fill();
    }
  }
};
