import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

import {
  FormGroup,
  Input,
  Button,
  BinIcon,
  QueryBreakpoints,
  Divider
} from 'joyent-ui-toolkit';

const { SmallOnly, Small } = QueryBreakpoints;

export default ({ name, formName, formValue, handleSubmit, onRemove, textarea }) => (
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
