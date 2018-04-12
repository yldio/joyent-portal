export default ({ fill = null, disabled = false, light = false, colors }) => {
  if (fill && colors[fill]) {
    return colors[fill];
  }

  if (fill) {
    return fill;
  }

  if (disabled) {
    return colors.grey;
  }

  if (light) {
    return colors.white;
  }

  return '#1B3240';
};
