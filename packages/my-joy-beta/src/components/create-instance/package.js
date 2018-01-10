import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import Flex from 'styled-flex-component';
import pretty from 'prettysize';

import {
  H2,
  P,
  FormGroup,
  Button,
  TableTh,
  TableTr,
  TableThead,
  TableTbody,
  Table,
  TableTd,
  Radio,
  H4
} from 'joyent-ui-toolkit';

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

export default ({
  handleSubmit,
  pristine,
  expanded,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortBy = () => null,
  onCancel,
  packages,
  pkg,
  vmSelected
}) => (
  <form onSubmit={handleSubmit}>
    {expanded ? (
      <Fragment>
        <Margin bottom={3}>
          <P>
            A package defines the specs of your instance. On Triton, packages
            can only increase in size. Read the docs
          </P>
        </Margin>

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
              {vmSelected && (
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
          <TableTbody>
            {packages.filter(p => p.vm === vmSelected).map(p => (
              <TableTr>
                <TableTd selected={pkg === p.id}>
                  <FormGroup
                    name="package"
                    value={p.id}
                    type="radio"
                    field={Field}
                    fluid
                  >
                    <Radio noMargin>
                      <H4>{p.name}</H4>
                    </Radio>
                  </FormGroup>
                </TableTd>
                <TableTd selected={pkg === p.id}>{pretty(p.memory)}</TableTd>
                <TableTd selected={pkg === p.id}>
                  {pretty(p.disk)}
                  {p.ssd && <Badge>SSD</Badge>}
                </TableTd>
                {vmSelected && (
                  <TableTd selected={pkg === p.id}>{p.vcpus}</TableTd>
                )}
                <TableTd selected={pkg === p.id}>{p.price}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
        <Button type="submit" disabled={pristine}>
          Next
        </Button>
      </Fragment>
    ) : (
      <Fragment>
        <Margin bottom={2} top={3}>
          {packages.map(p => {
            if (p.id === pkg) {
              return (
                <Fragment>
                  <H2>{p.name}</H2>
                  <Flex alignCenter>
                    <span>{p.price} $</span>
                    <VerticalDivider />
                    <span>{pretty(p.memory)}</span>
                    {vmSelected && (
                      <Fragment>
                        <VerticalDivider />
                        <span>{p.vcpus} vCPUS</span>
                      </Fragment>
                    )}
                    <VerticalDivider />
                    <span>{pretty(p.disk)} disk</span>
                    <VerticalDivider />
                    {p.ssd && <span>SSD</span>}
                  </Flex>
                </Fragment>
              );
            }
          })}
        </Margin>
        {pkg && <Button type="button" secondary onClick={onCancel}>
          Edit
        </Button>}
      </Fragment>
    )}
  </form>
);
