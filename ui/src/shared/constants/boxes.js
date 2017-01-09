const colors = require('./colors');

const boxes = {
  borderRadius: '4px',
  bottomShaddow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
  bottomShaddowDarker: '0 2px 0 0 rgba(0, 0, 0, 0.1)',
  insetShaddow: 'inset 0 3px 0 0 rgba(0, 0, 0, 0.05)',
  border: {
    checked: `1px solid ${colors.brandPrimary}`,
    unchecked: `1px solid ${colors.borderSecondary}`,
    confirmed: `1px solid ${colors.confirmation}`
  }
};

module.exports = boxes;
