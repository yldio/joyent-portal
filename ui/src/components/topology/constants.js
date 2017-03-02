const Lengths = {
  paddingLeft: 18,
  nodeWidth: 180
};

const Sizes = {
  buttonSize: {
    width: 40,
    height: 48
  },
  contentSize: {
    width: Lengths.nodeWidth,
    height: 101 // This is the height w/o info comp
  },
  nodeSize: {
    width: Lengths.nodeWidth,
    height: 156
  },
  nodeSizeWithChildren: {
    width: Lengths.nodeWidth,
    height: 276
  }
};

const Points = {
  buttonPosition: {
    x: Lengths.nodeWidth - Sizes.buttonSize.width,
    y: 0
  },
  contentPosition: {
    x: 0,
    y: Sizes.buttonSize.height
  },
  infoPosition: {
    x: Lengths.paddingLeft,
    y: 11
  },
  metricsPosition: {
    x: Lengths.paddingLeft,
    y: 41
  },
  subtitlePosition: {
    x: Lengths.paddingLeft,
    y: 23
  }
};

const Rects = {
  buttonRect: {
    ...Sizes.buttonSize,
    ...Points.buttonPosition
  },
  contentRect: {
    ...Sizes.contentSize,
    ...Points.contentPosition
  }
};


const Constants = {
  ...Lengths,
  ...Sizes,
  ...Points,
  ...Rects
};

export default Constants;
