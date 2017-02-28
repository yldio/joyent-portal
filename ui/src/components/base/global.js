import { css } from 'styled-components';
import { colors } from '../../shared/constants';

const fonts = [{
  family: 'LibreFranklin',
  filename: 'librefranklin-regular-webfont',
  styles: `
    weight: 400;
    style: normal;
  `
}, {
  family: 'LibreFranklin-Semi-Bold',
  filename: 'librefranklin-semibold-webfont',
  styles: `
    weight: 600;
    style: normal;
  `
}, {
  family: 'LibreFranklin-Bold',
  filename: 'librefranklin-bold-webfont',
  styles: `
    weight: 700;
    style: normal;
  `
}];

const fontDir = '../../assets/fonts/';

const fontFaces = fonts.map(({
  filename,
  family,
  styles
}) => `  
  
  @font-face {
    font-family: '${family}';
    src: url('${fontDir + filename}.eot'),
         url('${fontDir + filename}.eot?#iefix') format('embedded-opentype'),
         url('${fontDir + filename}.woff') format('woff'),
         url('${fontDir + filename}.woff2') format('woff2'),
         url('${fontDir + filename}.ttf') format('truetype'),
         url('${fontDir + filename}.svg#${family}') format('svg');
    ${styles}
  }
`);

export default css`
  ${fontFaces.join('\n')}

  html, body {
    font-size: 16px;
    margin: 0;
    background: ${colors.base.background};
  }
`;
