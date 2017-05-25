import Constants from '../constants';

const getAngleFromPoints = (source, target) => {
  const lineAngle = Math.atan2(target.y - source.y, target.x - source.x);
  const lineAngleDeg = lineAngle * 180 / Math.PI;
  const zeroToThreeSixty = lineAngleDeg < 0 ? 360 + lineAngleDeg : lineAngleDeg;

  return zeroToThreeSixty;
};

const getPosition = (angle, positions, position, noCorners = false) => {
  const positionIndex = noCorners
    ? Math.round(angle / 90) * 2
    : Math.round(angle / 45);

  const offsetPosition = positions[positionIndex];

  return {
    id: offsetPosition.id,
    x: position.x + offsetPosition.x,
    y: position.y + offsetPosition.y
  };
};

const getPositions = (rect, halfCorner = 0) => [
  {
    id: 'r',
    x: rect.right,
    y: 0
  },
  {
    id: 'br',
    x: rect.right - halfCorner,
    y: rect.bottom - halfCorner
  },
  {
    id: 'b',
    x: 0,
    y: rect.bottom
  },
  {
    id: 'bl',
    x: rect.left + halfCorner,
    y: rect.bottom - halfCorner
  },
  {
    id: 'l',
    x: rect.left,
    y: 0
  },
  {
    id: 'tl',
    x: rect.left + halfCorner,
    y: rect.top + halfCorner
  },
  {
    id: 't',
    x: 0,
    y: rect.top
  },
  {
    id: 'tr',
    x: rect.right - halfCorner,
    y: rect.top + halfCorner
  },
  {
    id: 'r',
    x: rect.right,
    y: 0
  }
];

const getRect = data =>
  data.children ? Constants.nodeRectWithChildren : Constants.nodeRect;

const calculateLineLayout = ({ source, target }) => {
  // actually, this will need to be got dynamically, in case them things are different sizes
  // yeah right, now you'll get to do exactly that

  const sourceRect = getRect(source);
  const targetRect = getRect(target);

  const halfCorner = 2;

  const sourcePositions = getPositions(sourceRect, halfCorner);
  const sourceAngle = getAngleFromPoints(source, target);
  const sourcePosition = getPosition(sourceAngle, sourcePositions, source);

  const targetPositions = getPositions(targetRect, halfCorner);
  const targetAngle = getAngleFromPoints(target, sourcePosition);
  const targetPosition = getPosition(targetAngle, targetPositions, target); // , true);

  const arrowAngle = getAngleFromPoints(sourcePosition, targetPosition);

  return {
    source,
    target,
    sourcePosition,
    targetPosition,
    arrowAngle
  };
};

export { calculateLineLayout };