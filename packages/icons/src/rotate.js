const rotate = {
  up: 180,
  right: 90,
  down: 0,
  left: -90
};

export default ({ children, direction = 'down' }) =>
  children({
    style: {
      transform: `rotate(${rotate[direction]}deg)`
    }
  });
