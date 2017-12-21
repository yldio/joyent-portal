import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import { KeyValue } from '@components/instances';
import { Field } from 'redux-form';

import {
  FormGroup,
  FormLabel,
  Input,
  Button,
  TagItem,
  TagList,
  TagItemContainer
} from 'joyent-ui-toolkit';

export const MenuForm = ({ addable = true, searchable, onAdd }) => (
  <form>
    <Row>
      <Col xs={7} sm={5}>
        <FormGroup name="filter" field={Field} fluid>
          <FormLabel>Filter</FormLabel>
          <Input disabled={!searchable} fluid />
        </FormGroup>
      </Col>
      <Col xs={5} sm={7}>
        <FormGroup right>
          <FormLabel>&#8291;</FormLabel>
          <Button
            type="button"
            disabled={!searchable || !addable}
            onClick={onAdd}
            small
            icon
            fluid
          >
            Add tag
          </Button>
        </FormGroup>
      </Col>
    </Row>
  </form>
);

export const AddForm = props => (
  <KeyValue {...props} method="add" input="input" type="tag" expanded />
);

export const EditForm = props => (
  <KeyValue {...props} method="edit" input="input" type="tag" expanded />
);

const Tag = ({ name, value, onClick }) => (
  <Margin right={1} bottom={1} key={`${name}-${value}`}>
    <TagItem onClick={onClick}>
      <TagItemContainer>
        {name}: {value}
      </TagItemContainer>
    </TagItem>
  </Margin>
);

export default ({ values, onToggleEditing, ...rest }) => (
  <TagList {...rest}>
    {values.map(({ id, name, ...tag }) => (
      <Tag
        key={id}
        id={id}
        name={name}
        {...tag}
        onClick={onToggleEditing && (() => onToggleEditing(name))}
      />
    ))}
  </TagList>
);
