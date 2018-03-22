import theme from 'joyent-ui-toolkit/dist/es/theme';

const font = theme.font.href({
  namespace: 'navigation'
});

const monoFont = theme.monoFont.href({
  namespace: 'navigation'
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
  },
  headerbg: '#1e313b',
  overlay: 'rgba(0, 0, 0, 0.25)',
  flexboxgrid: {
    gridSize: 12, // rem
    gutterWidth: 1.25, // rem
    outerMargin: 1.875, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 56, // rem
      lg: 59 // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 64, // em
      lg: 75 // em
    }
  }
};
