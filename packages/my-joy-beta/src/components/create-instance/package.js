import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import Flex from 'styled-flex-component';
import bytes from 'bytes';

import {
  H3,
  H4,
  Sup,
  FormGroup,
  Button,
  TableTh,
  TableTr,
  TableThead,
  TableTbody,
  Table,
  TableTd,
  Radio,
  Checkbox,
  FormLabel,
  GeneralIcon,
  StorageIcon,
  CpuIcon,
  MemoryIcon
} from 'joyent-ui-toolkit';

import Empty from '@components/empty';

const GroupIcons = {
  MEMORY: <MemoryIcon fill="#32ABCF" />,
  STORAGE: <StorageIcon fill="#A88A83" />,
  GENERAL: <GeneralIcon fill="#E08A0E" />,
  COMPUTE: <CpuIcon fill="#8043DC" />
};

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(18)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(18)};
  box-sizing: border-box;
`;

const TableTrActionable = styled(TableTr)`
  cursor: pointer;
`;

export const Filters = ({ onResetFilters }) => (
  <Margin top={1} bottom={3}>
    <H4>Filters</H4>
    <Flex wrap alignCenter justifyBetween>
      <FormGroup type="checkbox" name="compute-optimized" field={Field}>
        <Checkbox>
          <FormLabel actionable>
            <Flex alignCenter>
              {GroupIcons.COMPUTE}
              <Margin right={1} left={1}>
                Compute Optimized
              </Margin>
            </Flex>
          </FormLabel>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="memory-optimized" field={Field}>
        <Checkbox>
          <FormLabel actionable>
            <Flex alignCenter>
              {GroupIcons.MEMORY}
              <Margin left={1} right={2}>
                Memory Optimized
              </Margin>
            </Flex>
          </FormLabel>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="general-purpose" field={Field}>
        <Checkbox>
          <FormLabel actionable>
            <Flex alignCenter>
              {GroupIcons.GENERAL}
              <Margin left={1} right={2}>
                General Purpose
              </Margin>
            </Flex>
          </FormLabel>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="storage-optimized" field={Field}>
        <Checkbox>
          <FormLabel actionable>
            <Flex alignCenter>
              {GroupIcons.STORAGE}
              <Margin left={1} right={2}>
                Storage Optimized
              </Margin>
            </Flex>
          </FormLabel>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="ssd" field={Field}>
        <Checkbox>
          <FormLabel actionable>SSD</FormLabel>
        </Checkbox>
      </FormGroup>
    </Flex>
    <Margin top={2} bottom={1}>
      <Button type="button" onClick={onResetFilters} secondary>
        Reset Filters
      </Button>
    </Margin>
  </Margin>
);

export const Package = ({
  selected = false,
  id,
  name,
  group,
  memory,
  price,
  vcpus,
  disk,
  ssd,
  hasVms,
  sortBy,
  onRowClick
}) => (
  <TableTrActionable onClick={() => onRowClick({ id, selected })}>
    <TableTd right selected={selected}>
      <FormGroup name="package" value={id} type="radio" field={Field} fluid>
        <Radio onBlur={null} noMargin>
          <Flex alignCenter>
            {GroupIcons[group]}
            <Margin left={1} right={2}>
              <FormLabel
                style={{ fontWeight: sortBy === 'name' ? 'bold' : 'normal' }}
              >
                {name}
              </FormLabel>
            </Margin>
          </Flex>
        </Radio>
      </FormGroup>
    </TableTd>
    <TableTd right selected={selected} bold={sortBy === 'memory'}>
      {bytes(memory, { decimalPlaces: 0, unitSeparator: ' ' })}
    </TableTd>
    <TableTd right selected={selected} bold={sortBy === 'disk'}>
      {bytes(disk, { decimalPlaces: 0, unitSeparator: ' ' })}
      {ssd && (
        <Margin inline left={1}>
          <Sup badge>SSD</Sup>
        </Margin>
      )}
    </TableTd>
    {hasVms && (
      <TableTd right bold={sortBy === 'vcpus'} selected={selected}>
        {vcpus}
      </TableTd>
    )}
    <TableTd right bold={sortBy === 'price'} selected={selected}>
      {price}
    </TableTd>
  </TableTrActionable>
);

export const Packages = ({
  pristine,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortBy = () => null,
  hasVms,
  children,
  packages
}) => (
  <form>
    <Table>
      <TableThead>
        <TableTr>
          <TableTh
            onClick={() => onSortBy('name', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'name'}
            left
            middle
            xs="200"
            actionable
          >
            <span>Name </span>
          </TableTh>
          <TableTh
            xs="100"
            onClick={() => onSortBy('memory', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'memory'}
            right
            middle
            actionable
          >
            <span>RAM </span>
          </TableTh>
          <TableTh
            xs="100"
            onClick={() => onSortBy('disk', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'disk'}
            right
            middle
            actionable
          >
            <span>Disk </span>
          </TableTh>
          {hasVms && (
            <TableTh
              xs="100"
              onClick={() => onSortBy('vcpus', sortOrder)}
              sortOrder={sortOrder}
              showSort={sortBy === 'vcpus'}
              right
              middle
              actionable
            >
              <span>vCPU</span>
            </TableTh>
          )}
          <TableTh
            xs="100"
            onClick={() => onSortBy('price', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'price'}
            right
            middle
            actionable
          >
            <span>$/hour</span>
          </TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{children}</TableTbody>
    </Table>
    {!packages ? (
      <Empty>
        Sorry, but we weren’t able to find any packages with that filter
      </Empty>
    ) : null}
  </form>
);

export const Overview = ({
  name,
  price,
  memory,
  vcpus,
  hasVms,
  ssd,
  disk,
  onCancel
}) => (
  <Fragment>
    <Margin bottom={2}>
      <H3 noMargin>{name}</H3>
    </Margin>
    <Flex alignCenter>
      <span>{price} $</span>
      <VerticalDivider />
      <span>{bytes(memory, { decimalPlaces: 0, unitSeparator: ' ' })}</span>
      {hasVms && (
        <Fragment>
          <VerticalDivider />
          <span>{vcpus} vCPUS</span>
        </Fragment>
      )}
      <VerticalDivider />
      <span>{bytes(disk, { decimalPlaces: 0, unitSeparator: ' ' })} disk</span>
      <VerticalDivider />
      {ssd && <span>SSD</span>}
    </Flex>
  </Fragment>
);
