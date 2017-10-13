import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Field } from 'redux-form';

import {
  FormGroup,
  Input,
  Button,
  BinIcon,
  QueryBreakpoints,
  Divider,
  Editor
} from 'joyent-ui-toolkit';

const { SmallOnly } = QueryBreakpoints;

const TextareaKeyValue = ({
  name,
  formName,
  formValue,
  handleSubmit,
  onRemove,
  textarea
}) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={8} sm={10}>
        <FormGroup name={formName} reduxForm>
          <Input fluid mono marginless />
        </FormGroup>
      </Col>
      <Col xs={2} sm={1}>
        <Button
          type="button"
          onClick={() => onRemove(name)}
          secondary
          small
          icon
          fluid
          marginless
        >
          <BinIcon />
        </Button>
      </Col>
      <Col xs={2} sm={1}>
        <Button type="submit" secondary small icon fluid marginless>
          S
        </Button>
      </Col>
      <Col xs={12} sm={12}>
        <FormGroup name={formValue} reduxForm>
          <Field name={formValue} component={Editor} mode="sh" />
        </FormGroup>
      </Col>
      <Divider height="4" width="100%" transparent />
    </Row>
  </form>
);

const InputKeyValue = ({
  name,
  formName,
  formValue,
  handleSubmit,
  onRemove,
  textarea
}) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={12} sm={5}>
        <FormGroup name={formName} reduxForm>
          <Input fluid mono marginless />
        </FormGroup>
      </Col>
      <Col xs={12} sm={5}>
        <FormGroup name={formValue} reduxForm>
          <Input fluid mono marginless />
        </FormGroup>
      </Col>
      <Col xs={6} sm={1}>
        <Button
          type="button"
          onClick={() => onRemove(name)}
          secondary
          small
          icon
          fluid
          marginless
        >
          <BinIcon />
        </Button>
      </Col>
      <Col xs={6} sm={1}>
        <Button type="submit" secondary small icon fluid marginless>
          S
        </Button>
      </Col>
      <SmallOnly>
        <Divider height="4" width="100%" transparent />
      </SmallOnly>
    </Row>
  </form>
);

export default ({ textarea, ...rest }) =>
  textarea ? <TextareaKeyValue {...rest} /> : <InputKeyValue {...rest} />;
