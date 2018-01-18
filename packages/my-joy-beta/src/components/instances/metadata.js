import React from 'react';
import { Field } from 'redux-form';
import KeyValue from './key-value';

import {
  Row,
  Col,
  FormGroup,
  Input,
  FormLabel,
  Button
} from 'joyent-ui-toolkit';

export const MenuForm = ({ searchable, onAdd }) => (
  <form>
    <Row>
      <Col xs={7} sm={5}>
        <FormGroup name="filter" field={Field} fluid>
          <FormLabel>Filter</FormLabel>
          <Input onBlur={null} disabled={!searchable} fluid />
        </FormGroup>
      </Col>
      <Col xs={5} sm={7}>
        <FormGroup right>
          <FormLabel>&#8291;</FormLabel>
          <Button
            type="button"
            disabled={!searchable}
            onClick={onAdd}
            small
            icon
            fluid
          >
            Add metadata
          </Button>
        </FormGroup>
      </Col>
    </Row>
  </form>
);

export const AddForm = props => (
  <KeyValue {...props} method="add" input="textarea" type="metadata" expanded />
);

export const EditForm = props => (
  <KeyValue {...props} method="edit" input="textarea" type="metadata" />
);
