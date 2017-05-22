const parentEventHandler = Chart.Controller.prototype.eventHandler;

const createVerticalIntersectingLine = () => {
  Chart.Controller.prototype.eventHandler = function() {
    const ret = parentEventHandler.apply(this, arguments);

    const {
      x
    } = arguments[0];

    this.clear();
    this.draw();
    this.chart.ctx.beginPath();
    this.chart.ctx.moveTo(x, 30);
    this.chart.ctx.strokeStyle = self.opacityCol();
    this.chart.ctx.lineTo(x, 340);
    this.chart.ctx.stroke();

    return ret;
  };
};

export default createVerticalIntersectingLine;