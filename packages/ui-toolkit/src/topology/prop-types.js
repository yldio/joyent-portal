import PropTypes from 'prop-types';

const p = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

const s = {
  width: PropTypes.number,
  height: PropTypes.number
};

const Point = PropTypes.shape({
  ...p
});

const Size = PropTypes.shape({
  ...s
});

const Rect = PropTypes.shape({
  ...p,
  ...s
});

export { Point, Rect, Size };
