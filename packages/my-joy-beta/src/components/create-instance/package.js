import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Margin, Padding } from 'styled-components-spacing';
import remcalc from 'remcalc';
import Flex from 'styled-flex-component';
import bytes from 'bytes';

import {
  H3,
  H4,
  Card,
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
  Label,
  GeneralIcon,
  StorageIcon,
  CpuIcon,
  MemoryIcon
} from 'joyent-ui-toolkit';

import NoPackagesImage from '../../assets/no-packages.svg';

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

const SuperScript = styled.div`
  background: ${props => props.theme.primary};
  border-radius: ${remcalc(3)};
  font-weight: 600;
  line-height: normal;
  font-size: ${remcalc(8)};
  color: ${props => props.theme.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${remcalc(3)};
  position: absolute;
  margin-top: ${remcalc(-8)};
  margin-left: ${remcalc(6)};
`;

const NoPackagesTitle = styled(H3)`
  color: ${props => props.theme.greyDark};
`;

export const Filters = ({ resetFilters }) => (
  <Margin top={4} bottom={3}>
    <H4>Filters</H4>
    <Flex alignCenter justifyBetween>
      <FormGroup type="checkbox" name="compute-optimized" field={Field}>
        <Checkbox>
          <Label>
            <Flex alignCenter>
              {GroupIcons.COMPUTE}
              <Margin right={1} left={1}>
                Compute Optimized
              </Margin>
            </Flex>
          </Label>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="memory-optimized" field={Field}>
        <Checkbox>
          <Label>
            <Flex alignCenter>
              {GroupIcons.MEMORY}
              <Margin left={1} right={2}>
                Memory Optimized
              </Margin>
            </Flex>
          </Label>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="general-purpose" field={Field}>
        <Checkbox>
          <Label>
            <Flex alignCenter>
              {GroupIcons.GENERAL}
              <Margin left={1} right={2}>
                General Purpose
              </Margin>
            </Flex>
          </Label>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="storage-optimized" field={Field}>
        <Checkbox>
          <Label>
            <Flex alignCenter>
              {GroupIcons.STORAGE}
              <Margin left={1} right={2}>
                Storage Optimized
              </Margin>
            </Flex>
          </Label>
        </Checkbox>
      </FormGroup>
      <FormGroup type="checkbox" name="ssd" field={Field}>
        <Checkbox>
          <Label>SSD</Label>
        </Checkbox>
      </FormGroup>
    </Flex>
    <Margin top={2} bottom={1}>
      <Button secondary onClick={resetFilters}>
        Reset Filters
      </Button>
    </Margin>
  </Margin>
);

export const NoPackages = () => (
  <Card>
    <Padding all={6}>
      <Flex alignCenter justifyCenter column>
        <Margin bottom={2}>
          <img src={NoPackagesImage} alt="No packages were found" />
        </Margin>
        <NoPackagesTitle>
          Sorry, but we weren’t able to find any packages with that filter
        </NoPackagesTitle>
      </Flex>
    </Padding>
  </Card>
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
  hasVms
}) => (
  <TableTr>
    <TableTd right selected={selected}>
      <FormGroup name="package" value={id} type="radio" field={Field} fluid>
        <Radio onBlur={null} noMargin>
          <Flex alignCenter>
            {GroupIcons[group]}
            <Margin left={1} right={2}>
              <Label>{name}</Label>
            </Margin>
          </Flex>
        </Radio>
      </FormGroup>
    </TableTd>
    <TableTd right selected={selected}>
      {bytes(memory, { decimalPlaces: 0 })}
    </TableTd>
    <TableTd right selected={selected}>
      {bytes(disk, { decimalPlaces: 0 })}
      {ssd && <SuperScript>SSD</SuperScript>}
    </TableTd>
    {hasVms && (
      <TableTd right selected={selected}>
        {vcpus}
      </TableTd>
    )}
    <TableTd right selected={selected}>
      {price}
    </TableTd>
  </TableTr>
);

export const Packages = ({
  handleSubmit,
  pristine,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortBy = () => null,
  hasVms,
  children,
  packages
}) => (
  <form onSubmit={handleSubmit}>
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
              onClick={() => onSortBy('vcpu', sortOrder)}
              sortOrder={sortOrder}
              showSort={sortBy === 'vcpu'}
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
    {!packages ? <NoPackages /> : null}
    <Margin top={4}>
      <Button type="submit" disabled={pristine}>
        Next
      </Button>
    </Margin>
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
    <Margin bottom={2} top={3}>
      <H3 bold>{name}</H3>
      <Flex alignCenter>
        <span>{price} $</span>
        <VerticalDivider />
        <span>{bytes(memory, { decimalPlaces: 0 })}</span>
        {hasVms && (
          <Fragment>
            <VerticalDivider />
            <span>{vcpus} vCPUS</span>
          </Fragment>
        )}
        <VerticalDivider />
        <span>{bytes(disk, { decimalPlaces: 0 })} disk</span>
        <VerticalDivider />
        {ssd && <span>SSD</span>}
      </Flex>
    </Margin>
    <Button type="button" secondary onClick={onCancel}>
      Edit
    </Button>
  </Fragment>
);
