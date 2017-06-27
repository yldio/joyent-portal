const Lengths = {
  paddingLeft: 12,
  nodeWidth: 180
};

const Sizes = {
  buttonSize: {
    width: 40,
    height: 48
  },
  contentSize: {
    width: Lengths.nodeWidth,
    // height: 101 // This is the height w/o info comp
    height: 42
  },
  childContentSize: {
    width: Lengths.nodeWidth,
    height: 64
  },
  nodeSize: {
    width: Lengths.nodeWidth,
    // height: 156
    height: 90
  },
  nodeSizeWithChildren: {
    width: Lengths.nodeWidth,
    // height: 276
    height: 176
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
  // X, y, width, height
  buttonRect: {
    ...Sizes.buttonSize,
    ...Points.buttonPosition
  },
  contentRect: {
    ...Sizes.contentSize,
    ...Points.contentPosition
  },
  childContentRect: {
    ...Sizes.childContentSize,
    ...Points.contentPosition
  },
  // Top, bottom, left, right - from 'centre'
  nodeRect: {
    left: -Sizes.nodeSize.width / 2,
    right: Sizes.nodeSize.width / 2,
    top: -Sizes.nodeSize.height / 2,
    bottom: Sizes.nodeSize.height / 2
  },
  nodeRectWithChildren: {
    left: -Sizes.nodeSizeWithChildren.width / 2,
    right: Sizes.nodeSizeWithChildren.width / 2,
    top: -Sizes.nodeSizeWithChildren.height / 2 + Sizes.contentSize.height / 3,
    bottom: Sizes.nodeSizeWithChildren.height / 2 + Sizes.contentSize.height / 3
  }
};

const Constants = {
  ...Lengths,
  ...Sizes,
  ...Points,
  ...Rects
};

export default Constants;
