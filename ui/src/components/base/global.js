import { css } from 'styled-components';

import eotRegular from '../../assets/fonts/librefranklin-regular-webfont.eot';
import woffRegular from '../../assets/fonts/librefranklin-regular-webfont.woff';
// eslint-disable-next-line max-len
import woff2Regular from '../../assets/fonts/librefranklin-regular-webfont.woff2';
import ttfRegular from '../../assets/fonts/librefranklin-regular-webfont.ttf';
import svgRegular from '../../assets/fonts/librefranklin-regular-webfont.svg';
import eotSemibold from '../../assets/fonts/librefranklin-semibold-webfont.eot';
// eslint-disable-next-line max-len
import woffSemibold from '../../assets/fonts/librefranklin-semibold-webfont.woff';
// eslint-disable-next-line max-len
import woff2Semibold from '../../assets/fonts/librefranklin-semibold-webfont.woff2';
import ttfSemibold from '../../assets/fonts/librefranklin-semibold-webfont.ttf';
import svgSemibold from '../../assets/fonts/librefranklin-semibold-webfont.svg';
import eotBold from '../../assets/fonts/librefranklin-bold-webfont.eot';
import woffBold from '../../assets/fonts/librefranklin-bold-webfont.woff';
import woff2Bold from '../../assets/fonts/librefranklin-bold-webfont.woff2';
import ttfBold from '../../assets/fonts/librefranklin-bold-webfont.ttf';
import svgBold from '../../assets/fonts/librefranklin-bold-webfont.svg';

const fonts = [{
  family: 'LibreFranklin',
  weight: '400',
  style: 'normal',
  filenames: {
    eot: eotRegular,
    woff: woffRegular,
    woff2: woff2Regular,
    ttf: ttfRegular,
    svg: svgRegular
  }
}, {
  family: 'LibreFranklin-Semi-Bold',
  weight: '600',
  style: 'normal',
  filenames: {
    eot: eotSemibold,
    woff: woffSemibold,
    woff2: woff2Semibold,
    ttf: ttfSemibold,
    svg: svgSemibold
  }
}, {
  family: 'LibreFranklin-Bold',
  weight: '700',
  style: 'normal',
  filenames: {
    eot: eotBold,
    woff: woffBold,
    woff2: woff2Bold,
    ttf: ttfBold,
    svg: svgBold
  }
}];

const fontFaces = fonts.map(({
  filenames,
  family,
  style,
  weight
}) => `
  @font-face {
    font-family: '${family}';
    src: url('${filenames.eot}'),
         url('${filenames.eot}?#iefix') format('embedded-opentype'),
         url('${filenames.woff}') format('woff'),
         url('${filenames.woff2}') format('woff2'),
         url('${filenames.ttf}') format('truetype'),
         url('${filenames.svg}#${family}') format('svg');
    font-weight: ${weight};
    font-style: ${style};
`);

export default css`
  ${fontFaces.join('\n')}

  html, body {
    font-size: 16px;
    margin: 0;
  }
`;
