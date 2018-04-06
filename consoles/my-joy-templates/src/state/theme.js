import { theme } from 'joyent-ui-toolkit';

const font = theme.font.href({
  namespace: 'templates'
});

const monoFont = theme.monoFont.href({
  namespace: 'templates'
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
