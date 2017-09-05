import React from 'react';
import {
  FormMeta,
  Button,
  Label,
  Input,
  Small,
  FormGroup
} from 'joyent-ui-toolkit';
import { Row, Col } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import { Field } from 'redux-form';

const ButtonsRow = Row.extend`margin: ${remcalc(29)} 0 ${remcalc(60)} 0;`;

export const Name = ({ handleSubmit, onCancel, dirty }) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={12} md={4} lg={4}>
        <FormGroup name="name" reduxForm>
          <FormMeta left>
            <Label>Name the new deployment group</Label>
            <Small>
              Your services will be deployed to eu-east-1 data center.
            </Small>
          </FormMeta>
          <Input type="text" />
        </FormGroup>
      </Col>
    </Row>
    <ButtonsRow>
      <Button type="button" onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button type="submit" disabled={!dirty}>
        Next
      </Button>
    </ButtonsRow>
  </form>
);

export default Name;
