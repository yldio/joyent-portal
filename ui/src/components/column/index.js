/*
 * based on
 * github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Col.js
 */

import { breakpoints, sizes } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import isUndefined from 'lodash.isundefined';
import { calc } from '../../shared/functions';
import styled, { css } from 'styled-components';

const padding = sizes.halfGutterWidth || '0.5rem';

const direction = (size) => (props) => {
  return props[size] ? 'column-reverse' : 'column';
};

const width = (fallback) => (size) => (props) => {
  return !isUndefined(props[size])
    ? calc(`(${props[size]} / ${sizes.gridColumns}) * 100%`)
    : fallback;
};

const flexed = (...args) => (props) => {
  const isBasic = (
    !props.xs &&
    !props.sm &&
    !props.md &&
    !props.lg
  );

  return !isBasic
    ? css(...args)
    : css``;
};

const flexBasis = width('auto');
const maxWidth = width('100%');
const marginLeft = width(0);

const breakpoint = (prop, size) => {
  return (...args) => (props) => props[prop] && breakpoints[size](...args);
};

const sm = breakpoint('sm', 'small');
const smOffset = breakpoint('smOffset', 'small');
const md = breakpoint('md', 'medium');
const mdOffset = breakpoint('mdOffset', 'medium');
const lg = breakpoint('lg', 'large');
const lgOffset = breakpoint('lgOffset', 'large');

const Column = styled.div`
  box-sizing: border-box;
  padding-left: ${padding};
  padding-right: ${padding};

  // If no column size is passed, make it full width
  width: 100%;

  ${flexed`
    flex: 0 0 auto;
    flex-grow: 1;

    flex-basis: ${flexBasis('xs')};
    max-width: ${maxWidth('xs')};
    margin-left: ${marginLeft('xsOffset')};
    flex-direction: ${direction('xsReverse')};
  `}

  ${sm`
    flex-basis: ${flexBasis('sm')};
    max-width: ${maxWidth('sm')};
    flex-direction: ${direction('smReverse')};
  `}

  ${smOffset`
    margin-left: ${marginLeft('smOffset')};
  `}

  ${md`
    flex-basis: ${flexBasis('md')};
    max-width: ${maxWidth('md')};
    flex-direction: ${direction('mdReverse')};
  `}

  ${mdOffset`
    margin-left: ${marginLeft('mdOffset')};
  `}

  ${lg`
    flex-basis: ${flexBasis('lg')};
    max-width: ${maxWidth('lg')};
    flex-direction: ${direction('lgReverse')};
  `}

  ${lgOffset`
    margin-left: ${marginLeft('lgOffset')};
  `}
`;

export default Baseline(
  Column
);
