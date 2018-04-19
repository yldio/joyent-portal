import { theme } from 'joyent-ui-toolkit';

const font = theme.font.href({
  namespace: 'console'
});

const monoFont = theme.monoFont.href({
  namespace: 'console'
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
