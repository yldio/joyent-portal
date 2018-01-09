import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';

import {
  H3,
  P,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button
} from 'joyent-ui-toolkit';

export default ({ handleSubmit, pristine, expanded, name, onCancel }) => (
  <form onSubmit={handleSubmit}>
    {expanded ? (
      <Fragment>
        <Margin bottom={3}>
          <P>
            Your instance name will be used to identify this specific instance.
          </P>
        </Margin>
        <FormGroup name="name" fluid field={Field}>
          <FormLabel>Name</FormLabel>
          <Input />
          <FormMeta />
        </FormGroup>
        <Button type="submit" disabled={pristine}>
          Next
        </Button>
      </Fragment>
    ) : (
      <Fragment>
        <Margin bottom={2} top={3}>
          <H3>{name}</H3>
        </Margin>
        <Button type="button" secondary onClick={onCancel}>
          Edit
        </Button>
      </Fragment>
    )}
  </form>
);
