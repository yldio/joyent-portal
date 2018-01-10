import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import { remcalc } from 'remcalc';
import Flex from 'styled-flex-component';
import pretty from 'prettysize';

import {
  H3,
  P,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  TableTh,
  TableTr,
  TableThead,
  TableTbody,
  Checkbox,
  Table,
  TableTd,
  Radio,
  H4
} from 'joyent-ui-toolkit';

export default ({
  handleSubmit,
  pristine,
  expanded,
  sortOrder,
  sortBy,
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
            {packages.map(pkg => (
              <TableTr>
                <TableTd>
                  <FormGroup
                    name={`package-${pkg.id}`}
                    value={pkg.id}
                    type="radio"
                    field={Field}
                    fluid
                  >
                    <Radio>
                      <H4>{pkg.name}</H4>
                    </Radio>
                  </FormGroup>
                </TableTd>
                <TableTd>{pretty(pkg.memory)}</TableTd>
                <TableTd>{pretty(pkg.disk)}</TableTd>
                {vmSelected && <TableTd>{pkg.vcpus}</TableTd>}
                <TableTd>{pkg.price}</TableTd>
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
          <H3>{pkg}</H3>
        </Margin>
        <Button type="button" secondary onClick={onCancel}>
          Edit
        </Button>
      </Fragment>
    )}
  </form>
);
