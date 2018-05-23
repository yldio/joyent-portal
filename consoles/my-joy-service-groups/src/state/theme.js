import { theme } from 'joyent-ui-toolkit';

const font = theme.font.href({
  namespace: 'service-groups'
});

const monoFont = theme.monoFont.href({
  namespace: 'service-groups'
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
