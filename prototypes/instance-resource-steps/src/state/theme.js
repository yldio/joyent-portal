import { theme } from 'joyent-ui-toolkit';

const font = theme.font.href({
  namespace: 'instance-resource-steps'
});

const monoFont = theme.monoFont.href({
  namespace: 'instance-resource-steps'
});

export default {
  ...theme,
  font: {
    ...theme.font,
    href: () => font
  },
  monoFont: {
    ...theme.monoFont,
    href: () => monoFont
  }
};
