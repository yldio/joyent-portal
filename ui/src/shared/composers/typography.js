import { css } from 'styled-components';
import { colors } from '../../shared/constants';

export const libreFranklin = `
  font-family: 'LibreFranklin', Helvetica, sans-serif;
`;

export const libreFranklinSemiBold = `
  font-family: 'LibreFranklin-Semi-Bold', Helvetica, sans-serif;
`;

export const libreFranklinBold = `
  font-family: 'LibreFranklin-Bold', Helvetica, sans-serif;
`;

export const bold = css`
  font-weight: 600;
`;

export const regular = css`
  font-weight: normal;
`;

export const titleColor = css`
  color: ${colors.base.secondary};
`;

export const bodyColor = css`
  color: ${colors.base.text};
`;
