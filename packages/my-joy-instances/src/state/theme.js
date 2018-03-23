import { theme } from 'joyent-ui-toolkit';

const font = theme.font.href({
  namespace: 'instances'
});

const monoFont = theme.monoFont.href({
  namespace: 'instances'
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
