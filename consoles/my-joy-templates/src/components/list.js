import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  StatusLoader
} from 'joyent-ui-toolkit';

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

export const FetchingItem = () => (
  <TableTr colSpan="6">
    <TableTd colSpan="6" middle center>
      <StatusLoader />
    </TableTd>
  </TableTr>
);

export const Item = ({ id = '', name, image, created, ...template }) => (
  <TableTr>
    <TableTd padding="0" middle left>
      <FormGroup name={id}>
        <Checkbox noMargin />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      <A to={`/templates/${id}`} component={Link}>
        {name}
      </A>
    </TableTd>
    <TableTd middle left>
      {image.name}
    </TableTd>
    <TableTd middle left>
      {template.package.name}
    </TableTd>
    <TableTd middle left>
      {distanceInWordsToNow(created)}
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
          <TableTh left middle actionable>
            <span>Template name</span>
          </TableTh>
          <TableTh left middle actionable>
            <span>Image ID</span>
          </TableTh>
          <TableTh xs="0" sm="160" left middle actionable>
            <span>Package</span>
          </TableTh>
          <TableTh xs="160" left middle actionable>
            <span>Created</span>
          </TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{children}</TableTbody>
    </Table>
  </form>
);
