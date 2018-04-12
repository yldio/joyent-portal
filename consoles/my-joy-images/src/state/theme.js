import { theme } from 'joyent-ui-toolkit';

const font = theme.font.href({
  namespace: 'images'
});

const monoFont = theme.monoFont.href({
  namespace: 'images'
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
