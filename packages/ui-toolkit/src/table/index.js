import React from 'react';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import isBoolean from 'lodash.isboolean';
import isNaN from 'lodash.isnan';
import styled, { css } from 'styled-components';
import is, { isOr } from 'styled-is';
import remcalc from 'remcalc';

import Baseline from '../baseline';
import * as breakpoints from '../breakpoints';
import { Arrow as ArrowIcon } from '../icons';

const { styled: query } = breakpoints;

const handleBreakpoint = bp => props => {
  const num = Number(props[bp]);
  const hidden = (isBoolean(props[bp]) && !props[bp]) || num === 0;
  const width = remcalc(props[bp]);

  if (!hidden && isNaN(num)) {
    return '';
  }

  return `
    width: ${width};
    display: ${hidden ? 'none' : 'table-cell'};
  `;
};

const ColumnBorder = css`
  ${is('hasBorder')`
    border-${props => props.hasBorder}-width: ${remcalc(1)} !important;
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
    user-select: none;
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

const BaseTfoot = styled.tfoot`
  width: 100%;
  background: ${props => props.theme.background};

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
  background: ${props => props.theme.background};

  th:first-child {
    border-top-left-radius: ${remcalc(4)};
  }

  th:last-child {
    border-top-right-radius: ${remcalc(4)};
  }
`;

const BaseTbody = styled.tbody`
  width: 100%;

  ${is('shadow')`
    box-shadow: ${props => props.theme.shadows.bottomShadow};
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

  height: ${remcalc(42)};
  color: ${props => props.theme.greyLight};
  font-weight: 500;

  ${is('header')`
    border-bottom-width: 0;
  `};

  ${isOr('selected', 'showSort')`
    color: ${props => props.theme.text};
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  &:not(:first-child) {
    border-left-width: 0;
  }

  &:not(:last-child) {
    border-right-width: 0;
  }

  ${ColumnBorder};
`;

const BaseTd = styled.td`
  ${Column};

  border-bottom-width: 0;

  &:not(:first-child) {
    border-left-width: 0;
  }

  &:not(:last-child) {
    border-right-width: 0;
  }

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  ${is('selected')`
    border-color: ${props => props.theme.primary};
    background-color: rgba(59, 70, 204, 0.05);
    border-bottom-width: ${remcalc(1)};
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
    {({ disabled, header, selected } = {}) => (
      <Broadcast
        channel="almost-responsive-table"
        value={{ disabled, header, selected, ...rest }}
      >
        {children({ disabled, header, selected, ...rest })}
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

export const Tfoot = Baseline(({ children, ...rest }) => (
  <Propagate {...rest} header={true}>
    {value => (
      <BaseTfoot {...value} name="tfoot">
        {children}
      </BaseTfoot>
    )}
  </Propagate>
));

export const Tr = Baseline(({ children, ...rest }) => (
  <Propagate {...rest}>
    {value => (
      <BaseTr {...rest} {...value} name="tr">
        {children}
      </BaseTr>
    )}
  </Propagate>
));

export const Th = Baseline(({ children, ...rest }) => (
  <Propagate {...rest}>
    {({ showSort, sortOrder, header, ...value }) => (
      <BaseTh
        {...rest}
        {...value}
        showSort={showSort}
        header={header}
        name="th"
      >
        {children}
        {!showSort || !header ? null : (
          <ArrowIcon
            marginLeft={remcalc(9)}
            marginBottom={remcalc(2)}
            direction={sortOrder === 'asc' ? 'down' : 'up'}
          />
        )}
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
      <BaseTd {...rest} {...value} {...rest} name="td">
        {children}
      </BaseTd>
    )}
  </Propagate>
));
