import { css } from 'styled-components';
import theme from '../theme'

const baseFonts = `
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  Oxygen-Sans,
  Ubuntu,
  Cantarell,
  Helvetica,
  sans-serif
`;

export const loadedFontFamily = css`
  font-family: 'Libre Franklin', ${baseFonts};
`;

export const unloadedFontFamily = css`
  font-family: ${baseFonts};
`;

export const color = theme.text;

export const semibold = css`
  font-weight: 600;
`;

export const medium = css`
  font-weight: 500;
`;

export const normal = css`
  font-weight: 400;
`;

export default {
  loadedFontFamily,
  unloadedFontFamily,
  semibold,
  medium,
  normal
};

export { default as fonts, fontFaces } from './fonts';
