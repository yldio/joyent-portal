const colors = require('./colors');

const boxes = {
  borderRadius: '4px',
  bottomShaddow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
  insetShaddow: 'inset 0 3px 0 0 rgba(0, 0, 0, 0.05)',
  border: {
    checked: `1px solid ${colors.brandPrimary}`,
    unchecked: `1px solid ${colors.border}`,
    confirmed: `1px solid ${colors.confirmation}`
  },
  background: {
    primary: colors.brandPrimary,
    secondary: colors.brandSecondary,
    disabled: '#FAFAFA',
  }
};

module.exports = boxes;
