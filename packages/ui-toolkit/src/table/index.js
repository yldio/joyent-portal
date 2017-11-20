import React from 'react';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import isBoolean from 'lodash.isboolean';
import styled, { css } from 'styled-components';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';

import Baseline from '../baseline';
import { bottomShadow } from '../boxes';
import * as breakpoints from '../breakpoints';

const { styled: query } = breakpoints;

const handleBreakpoint = bp => props => {
  const hidden =
    (isBoolean(props[bp]) && !props[bp]) || Number(props[bp]) === 0;
  const width = remcalc(props[bp]);

  return `
    width: ${width};

    ${hidden &&
      `
      display: none;
    `};
  `;
};

const ColumnBorder = css`
  ${is('border')`
    border-${props => props.border}-width: ${remcalc(1)};
  `};
`;

const Column = css`
  border-width: ${remcalc(1)};
  border-style: solid;
  border-color: ${props => props.theme.grey};
  border-spacing: 0;

  ${is('disabled')`
    border-color: ${props => props.theme.grey};
  `};

  white-space: nowrap;

  box-sizing: border-box;
  padding: 0 ${remcalc(24)};
  height: ${remcalc(60)};

  ${handleBreakpoint('xs')};

  ${query.small`
    ${handleBreakpoint('sm')};
  `};

  ${query.medium`
    ${handleBreakpoint('md')};
  `};

  ${query.xlargeUp`
    ${handleBreakpoint('lg')};
  `};

  ${is('actionable')`
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.whiteHover};
    }

    &:active {
      background-color: ${props => props.theme.whiteActive};
    }
  `};

  ${is('baseline')`
    vertical-align: baseline;
  `};

  ${is('sub')`
    vertical-align: sub;
  `};

  ${is('text-top')`
    vertical-align: text-top;
  `};

  ${is('text-bottom')`
    vertical-align: text-bottom;
  `};

  ${is('middle')`
    vertical-align: middle;
  `};

  ${is('top')`
    vertical-align: top;
  `};

  ${is('bottom')`
    vertical-align: bottom;
  `};

  ${is('center')`
    text-align: center;
  `};

  ${is('left')`
    text-align: left;
  `};

  ${is('right')`
    text-align: right;
  `};
`;

const BaseTable = styled.table`
  overflow: hidden;
  border-spacing: 0;
  border-collapse: separate;
  table-layout: fixed;
  width: 100%;
  max-width: 100%;
`;

const BaseThFooter = styled.tfoot`
  width: 100%;

  th:first-child {
    border-bottom-left-radius: ${remcalc(4)};
  }

  th:last-child {
    border-bottom-right-radius: ${remcalc(4)};
  }

  th {
    border-top-width: 0;
  }
`;

const BaseThead = styled.thead`
  width: 100%;

  ${is('footer')`
    th:first-child {
      border-bottom-left-radius: ${remcalc(4)};
    }

    th:last-child {
      border-bottom-right-radius: ${remcalc(4)};
    }

    th {
      border-top-width: 0;
    }
  `};
  ${isNot('footer')`
    th:first-child {
      border-top-left-radius: ${remcalc(4)};
    }

    th:last-child {
      border-top-right-radius: ${remcalc(4)};
    }

    th {
      border-bottom-width: 0;
    }
  `};
`;

const BaseTbody = styled.tbody`
  width: 100%;

  ${is('shadow')`
    box-shadow: ${bottomShadow};
  `};

  ${is('actionable')`
    cursor: pointer;
  `};

  ${is('disabled')`
    border-color: ${props => props.theme.grey};
  `};
`;

const BaseTh = styled.th`
  ${Column};

  text-align: left;
  padding: ${remcalc(12)} ${remcalc(24)};
  height: ${remcalc(42)};
  color: ${props => props.theme.greyLight};
  font-weight: 500;

  ${is('selected')`
    color: ${props => props.theme.text};
    font-weight: bold;
  `};

  &:not(:first-child) {
    border-left-width: 0;
  }

  &:not(:last-child) {
    border-right-width: 0;
  }

  ${is('right')`
    text-align: right;
  `};

  ${ColumnBorder};
`;

const BaseTd = styled.td`
  ${Column};
  border-bottom-width: 0;
  vertical-align: middle;

  * {
    vertical-align: middle;
  }

  &:not(:first-child) {
    border-left-width: 0;
  }

  &:not(:last-child) {
    border-right-width: 0;
  }

  ${is('right')`
    text-align: right;
  `};

  ${ColumnBorder};
`;

const BaseTr = styled.tr`
  display: table-row;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.white};
  box-shadow: 0 ${remcalc(2)} 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  &:last-child {
    box-shadow: none;
  }

  ${is('selected')`
    box-shadow: none;
    td {
      border: 1px solid ${props => props.theme.primary};
      background-color: rgba(59, 70, 204, 0.05);;
    }
  `};

  &:last-child td {
    border-bottom-width: ${remcalc(1)};
  }

  ${is('actionable')`
    cursor: pointer;
  `};

  ${is('disabled')`
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.text};
    cursor: default;
  `};

  /* override background when thead > tr */
  ${is('header')`
    color: ${props => props.theme.text};
    background-color: transparent;
    border: none;
    box-shadow: none;
  `};
`;

/**
 * @example ./usage.md
 */
export default Baseline(({ children, ...rest }) => (
  <Broadcast channel="almost-responsive-table" value={rest}>
    <BaseTable {...rest}>{children}</BaseTable>
  </Broadcast>
));

const Propagate = ({ children, ...rest }) => (
  <Subscriber channel="almost-responsive-table">
    {({ disabled, header }) => (
      <Broadcast
        channel="almost-responsive-table"
        value={{ disabled, header, ...rest }}
      >
        {children({ disabled, header, ...rest })}
      </Broadcast>
    )}
  </Subscriber>
);

export const Thead = Baseline(({ children, ...rest }) => (
  <Propagate {...rest} header={true}>
    {value => (
      <BaseThead {...value} name="thdead">
        {children}
      </BaseThead>
    )}
  </Propagate>
));

export const ThFooter = Baseline(({ children, ...rest }) => (
  <Propagate {...rest} header={true}>
    {value => (
      <BaseThFooter {...value} name="thfoot">
        {children}
      </BaseThFooter>
    )}
  </Propagate>
));

export const Tr = Baseline(({ children, ...rest }) => (
  <Propagate {...rest}>
    {value => (
      <BaseTr {...value} name="tr">
        {children}
      </BaseTr>
    )}
  </Propagate>
));

export const Th = Baseline(({ children, ...rest }) => (
  <Propagate {...rest}>
    {value => (
      <BaseTh {...value} name="th">
        {children}
      </BaseTh>
    )}
  </Propagate>
));

export const Tbody = Baseline(({ children, ...rest }) => (
  <Propagate {...rest}>
    {value => (
      <BaseTbody {...value} name="tbody">
        {children}
      </BaseTbody>
    )}
  </Propagate>
));

export const Td = Baseline(({ children, ...rest }) => (
  <Propagate {...rest}>
    {value => (
      <BaseTd {...value} name="td">
        {children}
      </BaseTd>
    )}
  </Propagate>
));
