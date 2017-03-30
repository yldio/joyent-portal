import { css } from 'styled-components';

import eotNormal from './libre-franklin/regular.eot';
import woffNormal from './libre-franklin/regular.woff';
import woff2Normal from './libre-franklin/regular.woff2';
import ttfNormal from './libre-franklin/regular.ttf';
import svgNormal from './libre-franklin/regular.svg';
import eotSemibold from './libre-franklin/semibold.eot';
import woffSemibold from './libre-franklin/semibold.woff';
import woff2Semibold from './libre-franklin/semibold.woff2';
import ttfSemibold from './libre-franklin/semibold.ttf';
import svgSemibold from './libre-franklin/semibold.svg';
import eotBold from './libre-franklin/bold.eot';
import woffBold from './libre-franklin/bold.woff';
import woff2Bold from './libre-franklin/bold.woff2';
import ttfBold from './libre-franklin/bold.ttf';
import svgBold from './libre-franklin/bold.svg';

import eotMedium from './libre-franklin/medium.eot';
import woffMedium from './libre-franklin/medium.woff';
import woff2Medium from './libre-franklin/medium.woff2';
import ttfMedium from './libre-franklin/medium.ttf';
import svgMedium from './libre-franklin/medium.svg';

const fontFaces = {
  normal: {
    family: 'Libre Franklin',
    style: 'normal',
    weight: 400,
    filenames: {
      eot: eotNormal,
      woff: woffNormal,
      woff2: woff2Normal,
      ttf: ttfNormal,
      svg: svgNormal
    }
  },
  medium: {
    family: 'Libre Franklin',
    style: 'normal',
    weight: 500,
    filenames: {
      eot: eotMedium,
      woff: woffMedium,
      woff2: woff2Medium,
      ttf: ttfMedium,
      svg: svgMedium
    }
  },
  semibold: {
    family: 'Libre Franklin',
    style: 'normal',
    weight: 600,
    filenames: {
      eot: eotSemibold,
      woff: woffSemibold,
      woff2: woff2Semibold,
      ttf: ttfSemibold,
      svg: svgSemibold
    }
  },
  bold: {
    family: 'Libre Franklin',
    style: 'normal',
    weight: 700,
    filenames: {
      eot: eotBold,
      woff: woffBold,
      woff2: woff2Bold,
      ttf: ttfBold,
      svg: svgBold
    }
  }
};

const generate = (name) => css`
  @font-face {
    font-family: '${fontFaces[name].family}';
    font-style: ${fontFaces[name].style};
    font-weight: ${fontFaces[name].weight};
    src: url('${fontFaces[name].filenames.eot}');
    src: url('${fontFaces[name].filenames.eot}?#iefix')
           format('embedded-opentype'),
         url('${fontFaces[name].filenames.woff}')
           format('woff'),
         url('${fontFaces[name].filenames.woff2}')
           format('woff2'),
         url('${fontFaces[name].filenames.ttf}')
           format('truetype'),
         url('${fontFaces[name].filenames.svg}#${fontFaces[name].family}')
           format('svg');
  }
`;

export const libreFranklin = {
  normal: generate('normal'),
  medium: generate('medium'),
  semibold: generate('semibold'),
  bold: generate('bold')
};
