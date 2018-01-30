import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import {
  FormGroup,
  Input,
  FormLabel,
  Button,
  Divider
} from 'joyent-ui-toolkit';

export const Toolbar = ({
  searchLabel = 'Filter',
  searchPlaceholder = '',
  searchable = true,
  actionLabel = 'Create',
  actionable = true,
  onActionClick
}) => (
  <Row>
    <Col xs={7} sm={5}>
      <FormGroup name="filter" fluid field={Field}>
        <FormLabel>{searchLabel}</FormLabel>
        <Margin top={0.5}>
          <Input placeholder={searchPlaceholder} disabled={!searchable} fluid />
        </Margin>
      </FormGroup>
    </Col>
    <Col xs={5} sm={7}>
      <FormGroup right>
        <Divider height={remcalc(21)} transparent />
        <Button
          type={onActionClick ? 'button' : 'submit'}
          disabled={!actionable}
          onClick={onActionClick}
          icon
          fluid
        >
          {actionLabel}
        </Button>
      </FormGroup>
    </Col>
  </Row>
);

export default ({ handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <Toolbar {...rest} />
    <Divider height={remcalc(20)} transparent />
  </form>
);
