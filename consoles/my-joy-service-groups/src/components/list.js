import React, { Fragment } from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import remcalc from 'remcalc';
import styled from 'styled-components';
import titleCase from 'title-case';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import {
  Anchor,
  FormGroup,
  Checkbox,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  PaginationTableFoot,
  PaginationItem,
  StatusLoader,
  ActionsIcon
} from 'joyent-ui-toolkit';

import { Global } from '@state/global';

const A = styled(Anchor)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: ${props => props.theme.font.weight.semibold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
`;

const MarginalPaginationItem = styled(PaginationItem)`
  margin: 0 ${remcalc(3)};
`;

export const FetchingItem = () => (
  <TableTr colSpan="6">
    <TableTd colSpan="6" middle center>
      <StatusLoader />
    </TableTd>
  </TableTr>
);

export const Item = ({ id = '', name, capacity, template, created_at }) => (
  <TableTr>
    <TableTd padding="0" middle left>
      <FormGroup name={id}>
        <Checkbox noMargin />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      <A to={`/service-groups/${id}`} component={Link}>
        {name}
      </A>
    </TableTd>
    <TableTd middle left>
      {capacity}
    </TableTd>
    <TableTd middle left>
      <A to={`/templates/${template.id}`} component={Link}>
        {template.name}
      </A>
    </TableTd>
    <TableTd middle left>
      {distanceInWordsToNow(created_at)}
    </TableTd>
    <TableTd padding="0" hasBorder="left" center middle>
      <ActionsIcon disabled />
    </TableTd>
  </TableTr>
);

export default ({
  sortBy = 'name',
  sortOrder = 'desc',
  submitting = false,
  allSelected = false,
  toggleSelectAll = () => null,
  onSortBy = () => null,
  children
}) => (
  <form>
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="32" padding="0" middle left>
            <FormGroup>
              <Checkbox
                checked={allSelected}
                disabled={submitting}
                onChange={toggleSelectAll}
                noMargin
              />
            </FormGroup>
          </TableTh>
          <TableTh
            onClick={() => onSortBy('name')}
            sortOrder={sortOrder}
            showSort={sortBy === 'name'}
            left
            middle
            actionable
          >
            <span>Name</span>
          </TableTh>
          <TableTh
            xs="0"
            sm="120"
            onClick={() => onSortBy('capacity')}
            sortOrder={sortOrder}
            showSort={sortBy === 'capacity'}
            left
            middle
            actionable
          >
            <span>Desired #</span>
          </TableTh>
          <TableTh
            xs="0"
            sm="160"
            onClick={() => onSortBy('template')}
            sortOrder={sortOrder}
            showSort={sortBy === 'template'}
            left
            middle
            actionable
          >
            <span>Template</span>
          </TableTh>
          <TableTh
            xs="0"
            sm="160"
            onClick={() => onSortBy('created')}
            sortOrder={sortOrder}
            showSort={sortBy === 'created'}
            left
            middle
            actionable
          >
            <span>Created</span>
          </TableTh>
          <TableTh xs="60" padding="0" />
        </TableTr>
      </TableThead>
      <TableTbody>{children}</TableTbody>
    </Table>
  </form>
);
