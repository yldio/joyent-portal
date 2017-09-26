import { css } from 'styled-components';
import theme from '../theme'

export const fontFamily = css`
  font-family:
    "Libre Franklin",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen-Sans,
    Ubuntu,
    Cantarell,
    Helvetica,
    sans-serif;
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
  fontFamily,
  semibold,
  medium,
  normal
};

export { default as fonts } from './fonts';
