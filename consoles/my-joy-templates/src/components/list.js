import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import styled from 'styled-components';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin, Padding } from 'styled-components-spacing';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

import {
  Card,
  CardOutlet,
  Anchor,
  Button,
  P,
  H3,
  FormGroup,
  Checkbox,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  StickyFooter,
  StatusLoader,
  DeleteIcon,
  EmptyStateIcon
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

export const BulkFooter = ({ items = [], onRemove }) => {
  const disabled = items.some(({ removing }) => removing);

  return (
    <StickyFooter fill="disabled" fixed bottom>
      <Row between="xs" middle="xs">
        <Col xs="7">
          <Flex>
            <Margin right="1">
              <Button
                type="button"
                to={`/service-groups/~create?template=${items[0].id}`}
                component={Link}
                disabled={disabled || items.length > 1}
                icon
              >
                <span>Create Service Group</span>
              </Button>
            </Margin>
            <Button
              type="button"
              to={`/templates/~duplicate/${items[0].id}/name`}
              component={Link}
              disabled={disabled || items.length > 1}
              secondary
              icon
            >
              <span>Duplicate</span>
            </Button>
          </Flex>
        </Col>
        <Col xs="5">
          <Flex justifyEnd alignCenter>
            <FlexItem>
              <Button
                type="button"
                onClick={ev => onRemove(ev, items)}
                disabled={disabled}
                error
                secondary
                icon
              >
                <Margin right="1">
                  <DeleteIcon fill={disabled ? 'grey' : 'red'} />
                </Margin>
                <span>Remove</span>
              </Button>
            </FlexItem>
          </Flex>
        </Col>
      </Row>
    </StickyFooter>
  );
};

export const LoadingRow = ({ children }) => (
  <TableTr colSpan="5">
    <TableTd colSpan="5" middle center>
      <Margin vertical="5">
        <StatusLoader>{children}</StatusLoader>
      </Margin>
    </TableTd>
  </TableTr>
);

export const EmptyCard = () => (
  <Card>
    <CardOutlet>
      <Row center="xs">
        <Col xs="12" sm="9" md="8" lg="6">
          <Padding all="5">
            <Margin bottom="3">
              <EmptyStateIcon />
            </Margin>
            <Margin bottom="2">
              <H3 bold>No templates found</H3>
            </Margin>
            <P>You can create a new template with the below button.</P>
            <Margin top="3">
              <Button
                type="button"
                component={Link}
                to="/templates/~create/name"
              >
                Create template
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

export const Item = ({ id = '', name, image, created, ...template }) => (
  <TableTr>
    <TableTd middle left>
      <FormGroup name={id} field={Field}>
        <Checkbox noMargin />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      <A to={`/templates/${id}`} component={Link}>
        {name}
      </A>
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {image.substring(0, 7)}
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {template.package.substring(0, 7)}
    </TableTd>
    <TableTd xs="0" sm="180" middle left>
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
          <TableTh xs="42" middle left>
            <FormGroup>
              <Checkbox
                checked={checked}
                disabled={submitting}
                onChange={onToggleCheckAll}
                noMargin
              />
            </FormGroup>
          </TableTh>
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
            xs="0"
            sm="180"
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
