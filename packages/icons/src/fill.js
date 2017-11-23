export default ({ fill = null, disabled = false, light = false, colors }) => {
  if (fill) {
    return fill;
  }

  if (disabled) {
    return colors.grey;
  }

  if (light) {
    return colors.white;
  }

  return colors.text;
};
