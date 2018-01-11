import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import Flex from 'styled-flex-component';
import pretty from 'prettysize';

import {
  H2,
  H4,
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

const Badge = styled.div`
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
  position: relative;
  top: ${remcalc(-8)};
  margin-left: ${remcalc(6)};
`;

export const Filters = () => (
  <Margin top={4} bottom={3}>
    <H4>Filters</H4>
    <Flex alignCenter justifyBetween>
      <FormGroup type="checkbox" name="compute-optimized" field={Field}>
        <Checkbox>
          <Label>
            <Flex alignCenter>
              {GroupIcons.COMPUTE}
              <Margin right={1} left={1}>
                Compute optimized
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
                Memory optimized
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
                Storage optimized
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
  hasVms
}) => (
  <TableTr>
    <TableTd selected={selected}>
      <FormGroup name="package" value={id} type="radio" field={Field} fluid>
        <Radio noMargin>
          <Flex alignCenter>
            {GroupIcons[group]}
            <Margin left={1} right={2}>
              <Label>{name}</Label>
            </Margin>
          </Flex>
        </Radio>
      </FormGroup>
    </TableTd>
    <TableTd selected={selected}>{pretty(memory)}</TableTd>
    <TableTd selected={selected}>
      {pretty(disk)}
      {ssd && <Badge>SSD</Badge>}
    </TableTd>
    {hasVms && <TableTd selected={selected}>{vcpus}</TableTd>}
    <TableTd selected={selected}>{price}</TableTd>
  </TableTr>
);

export const Packages = ({
  handleSubmit,
  pristine,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortBy = () => null,
  hasVms,
  children
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
            onClick={() => onSortBy('ram', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'ram'}
            left
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
            left
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
              left
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
            left
            middle
            actionable
          >
            <span>$/hour</span>
          </TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{children}</TableTbody>
    </Table>
    <Button type="submit" disabled={pristine}>
      Next
    </Button>
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
      <H2>{name}</H2>
      <Flex alignCenter>
        <span>{price} $</span>
        <VerticalDivider />
        <span>{pretty(memory)}</span>
        {hasVms && (
          <Fragment>
            <VerticalDivider />
            <span>{vcpus} vCPUS</span>
          </Fragment>
        )}
        <VerticalDivider />
        <span>{pretty(disk)} disk</span>
        <VerticalDivider />
        {ssd && <span>SSD</span>}
      </Flex>
    </Margin>
    <Button type="button" secondary onClick={onCancel}>
      Edit
    </Button>
  </Fragment>
);
