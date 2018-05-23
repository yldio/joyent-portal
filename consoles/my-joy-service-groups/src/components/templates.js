import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import styled from 'styled-components';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin, Padding } from 'styled-components-spacing';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

import {
  Card,
  CardOutlet,
  H4,
  P,
  Button,
  FormGroup,
  FormLabel,
  Radio,
  StatusLoader,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  ExternalIcon
} from 'joyent-ui-toolkit';

const Name = styled.span`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: ${props => props.theme.font.weight.semibold};
`;

export const EmptyCard = () => (
  <Card>
    <CardOutlet>
      <Row center="xs">
        <Col xs="12" sm="9" md="8" lg="6">
          <Padding all="5">
            <H4 bold>No templates found</H4>
            <P>
              In order to deploy a Service Group, you’ll need to first create a
              template to base your instances off of. Click below to continue
            </P>
            <Margin top="3">
              <Button
                type="button"
                component={Link}
                to="/templates/~create/name"
                secondary
                icon
              >
                <Margin right="2">
                  <ExternalIcon />
                </Margin>
                <span>Create template</span>
              </Button>
            </Margin>
          </Padding>
        </Col>
      </Row>
    </CardOutlet>
  </Card>
);

export const EmptyRow = () => (
  <TableTr colSpan="5">
    <TableTd colSpan="5" middle center>
      <Padding vertical="4">
        <P>You have no templates that match your query</P>
      </Padding>
    </TableTd>
  </TableTr>
);

export const LoadingRow = ({ children }) => (
  <TableTr colSpan="5">
    <TableTd colSpan="5" middle center>
      <Margin vertical="5">
        <StatusLoader>{children}</StatusLoader>
      </Margin>
    </TableTd>
  </TableTr>
);

export const Item = ({ id = '', name, image, created, ...template }) => (
  <TableTr>
    <TableTd colSpan="2" middle left>
      <FormGroup name="template" value={id} type="radio" field={Field}>
        <Radio onBlur={null} noMargin>
          <Margin left="5">
            <FormLabel noMargin actionable>
              <Name>{name}</Name>
            </FormLabel>
          </Margin>
        </Radio>
      </FormGroup>
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {image.substring(0, 7)}
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {template.package.substring(0, 7)}
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
  checked = false,
  onToggleCheckAll = () => null,
  onSortBy = () => null,
  children
}) => (
  <form>
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="42" middle left />
          <TableTh
            sortOrder={sortOrder}
            showSort={sortBy === 'name'}
            onClick={() => onSortBy('name')}
            left
            middle
            actionable
          >
            <span>Name</span>
          </TableTh>
          <TableTh
            xs="0"
            sm="160"
            sortOrder={sortOrder}
            showSort={sortBy === 'image'}
            onClick={() => onSortBy('image')}
            left
            middle
            actionable
          >
            <span>Image</span>
          </TableTh>
          <TableTh
            xs="0"
            sm="160"
            sortOrder={sortOrder}
            showSort={sortBy === 'package'}
            onClick={() => onSortBy('package')}
            left
            middle
            actionable
          >
            <span>Package</span>
          </TableTh>
          <TableTh
            xs="180"
            sortOrder={sortOrder}
            showSort={sortBy === 'created'}
            onClick={() => onSortBy('created')}
            left
            middle
            actionable
          >
            <span>Created</span>
          </TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{children}</TableTbody>
    </Table>
  </form>
);
