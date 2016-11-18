module.exports = function(Chart) {
  var helpers = Chart.helpers;

  Chart.defaults.whisker = {
    hover: {
      mode: 'label'
    },

    scales: {
      xAxes: [{
        type: 'category',

        // Specific to Bar Controller
        categoryPercentage: 0.8,
        barPercentage: 0.9,

        // grid line settings
        gridLines: {
          offsetGridLines: true
        }
      }],
      yAxes: [{
        type: 'linear'
      }]
    }
  };

  Chart.controllers.whisker = Chart.DatasetController.extend({

    dataElementType: Chart.Element.extend(Chart.elements.Rectangle.prototype),

    initialize: function(chart, datasetIndex) {
      Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);

      // Use this to indicate that this is a bar dataset.
      this.getMeta().bar = true;
    },

    // Get the number of datasets that display bars. We use this to correctly calculate the bar width
    getBarCount: function() {
      var me = this;
      var barCount = 0;
      helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
        var meta = me.chart.getDatasetMeta(datasetIndex);
        if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
          ++barCount;
        }
      }, me);
      return barCount;
    },

    update: function(reset) {
      var me = this;
      helpers.each(me.getMeta().data, function(rectangle, index) {
        me.updateElement(rectangle, index, reset);
      }, me);
    },

    updateElement: function(rectangle, index, reset) {
      var me = this;
      var meta = me.getMeta();
      var xScale = me.getScaleForId(meta.xAxisID);
      var yScale = me.getScaleForId(meta.yAxisID);
      var scaleBase = yScale.getBasePixel();
      var rectangleElementOptions = me.chart.options.elements.rectangle;
      var custom = rectangle.custom || {};
      var dataset = me.getDataset();

      rectangle._xScale = xScale;
      rectangle._yScale = yScale;
      rectangle._datasetIndex = me.index;
      rectangle._index = index;

      var ruler = me.getRuler(index);
      rectangle._model = {
        x: me.calculateBarX(index, me.index, ruler),
        y: reset ? scaleBase : me.boxTopValue(index, me.index),

        // Tooltip
        label: me.chart.data.labels[index],
        datasetLabel: dataset.label,

        // Appearance
        base: reset ? scaleBase : me.boxBottomValue(me.index, index),
        width: me.calculateBarWidth(ruler),
        backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
        borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
        borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
        borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
      };

      rectangle.pivot();
    },

    boxBottomValue: function(datasetIndex, index) {
      var me = this;
      var meta = me.getMeta();
      var yScale = me.getScaleForId(meta.yAxisID);
      var obj = me.getDataset().data[index];
      var value = Number(obj.firstQuartile);

      return yScale.getPixelForValue(value);
    },

    boxTopValue: function(index, datasetIndex) {
      var me = this;
      var meta = me.getMeta();
      var yScale = me.getScaleForId(meta.yAxisID);
      var obj = me.getDataset().data[index];
      var value = Number(obj.thirdQuartile);

      return yScale.getPixelForValue(value);
    },

    getRuler: function(index) {
      var me = this;
      var meta = me.getMeta();
      var xScale = me.getScaleForId(meta.xAxisID);
      var datasetCount = me.getBarCount();

      var tickWidth;

      if (xScale.options.type === 'category') {
        tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
      } else {
        // Average width
        tickWidth = xScale.width / xScale.ticks.length;
      }
      var categoryWidth = tickWidth * xScale.options.categoryPercentage;
      var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
      var fullBarWidth = categoryWidth / datasetCount;

      if (xScale.ticks.length !== me.chart.data.labels.length) {
        var perc = xScale.ticks.length / me.chart.data.labels.length;
        fullBarWidth = fullBarWidth * perc;
      }

      var barWidth = fullBarWidth * xScale.options.barPercentage;
      var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);

      return {
        datasetCount: datasetCount,
        tickWidth: tickWidth,
        categoryWidth: categoryWidth,
        categorySpacing: categorySpacing,
        fullBarWidth: fullBarWidth,
        barWidth: barWidth,
        barSpacing: barSpacing
      };
    },

    calculateBarWidth: function(ruler) {
      var xScale = this.getScaleForId(this.getMeta().xAxisID);
      if (xScale.options.barThickness) {
        return xScale.options.barThickness;
      }
      return ruler.barWidth;
    },

    // Get bar index from the given dataset index accounting for the fact that not all bars are visible
    getBarIndex: function(datasetIndex) {
      var barIndex = 0;
      var meta;
      var j;

      for (j = 0; j < datasetIndex; ++j) {
        meta = this.chart.getDatasetMeta(j);
        if (meta.bar && this.chart.isDatasetVisible(j)) {
          ++barIndex;
        }
      }

      return barIndex;
    },

    calculateBarX: function(index, datasetIndex, ruler) {
      var me = this;
      var meta = me.getMeta();
      var xScale = me.getScaleForId(meta.xAxisID);
      var barIndex = me.getBarIndex(datasetIndex);
      var leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
      leftTick -= me.chart.isCombo ? (ruler.tickWidth / 2) : 0;

      return leftTick +
        (ruler.barWidth / 2) +
        ruler.categorySpacing +
        (ruler.barWidth * barIndex) +
        (ruler.barSpacing / 2) +
        (ruler.barSpacing * barIndex);
    },

    draw: function(ease) {
      var me = this;
      var easingDecimal = ease || 1;
      var metaData = me.getMeta().data;
      var dataset = me.getDataset();
      var i, len;

      for (i = 0, len = metaData.length; i < len; ++i) {
        var d = dataset.data[i];
        if (d !== null && d !== undefined && typeof d === 'object' && !isNaN(d.median)) {
          metaData[i].transition(easingDecimal).draw();
        }
      }
    },

    setHoverStyle: function(rectangle) {
      var dataset = this.chart.data.datasets[rectangle._datasetIndex];
      var index = rectangle._index;

      var custom = rectangle.custom || {};
      var model = rectangle._model;
      model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
      model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
      model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
    },

    removeHoverStyle: function(rectangle) {
      var dataset = this.chart.data.datasets[rectangle._datasetIndex];
      var index = rectangle._index;
      var custom = rectangle.custom || {};
      var model = rectangle._model;
      var rectangleElementOptions = this.chart.options.elements.rectangle;

      model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
      model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
      model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
    }

  });
};
