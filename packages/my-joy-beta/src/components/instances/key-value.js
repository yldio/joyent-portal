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

const { SmallOnly, Small } = QueryBreakpoints;

const TextareaKeyValue = ({ name, formName, formValue, handleSubmit, onRemove, textarea }) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={12} sm={10}>
        <FormGroup name={formName} reduxForm>
          <Input fluid mono marginless />
        </FormGroup>
      </Col>
      <Col xs={6} sm={1}>
        <Button type="button" onClick={() => onRemove(name)} secondary small icon fluid>
          <BinIcon />
        </Button>
      </Col>
      <Col xs={6} sm={1}>
        <Button type="submit" secondary small icon fluid>
          S
        </Button>
      </Col>
      <Col xs={12} sm={12}>
        <FormGroup name={formValue} reduxForm>
          <Field name={formValue} component={Editor} mode='sh' />
        </FormGroup>
      </Col>
      <SmallOnly>
        <Divider height="4" width="100%" transparent />
      </SmallOnly>
      <Small>
        <Divider height="2" width="100%" transparent />
      </Small>
    </Row>
  </form>
);

const InputKeyValue = ({ name, formName, formValue, handleSubmit, onRemove, textarea }) => (
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
        <Button type="button" onClick={() => onRemove(name)} secondary small icon fluid>
          <BinIcon />
        </Button>
      </Col>
      <Col xs={6} sm={1}>
        <Button type="submit" secondary small icon fluid>
          S
        </Button>
      </Col>
      <SmallOnly>
        <Divider height="4" width="100%" transparent />
      </SmallOnly>
    </Row>
  </form>
);

export default ({ textarea, ...rest }) => textarea
  ? <TextareaKeyValue {...rest} />
  : <InputKeyValue {...rest} />;
