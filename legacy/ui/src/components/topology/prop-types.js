import React from 'react';

const p = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};

const s = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

const Point = React.PropTypes.shape({
  ...p
});

const Size = React.PropTypes.shape({
  ...s
});

const Rect = React.PropTypes.shape({
  ...p,
  ...s
});

export default {
  Point,
  Rect,
  Size
};
