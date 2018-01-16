import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Description from '@components/create-instance/description';

import {
  H3,
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
        <Description>
          Your instance name will be used to identify this specific instance.
        </Description>
        <FormGroup name="name" fluid field={Field}>
          <FormLabel>Instance Name</FormLabel>
          <Input />
          <FormMeta />
        </FormGroup>
        <Margin top={2} bottom={4}>
          <Button type="submit" disabled={pristine}>
            Next
          </Button>
        </Margin>
      </Fragment>
    ) : (
      <Fragment>
        {name ? (
          <Fragment>
            <Margin bottom={2} top={3}>
              <H3 bold>{name}</H3>
            </Margin>
            <Button type="button" secondary onClick={onCancel}>
              Edit
            </Button>
          </Fragment>
        ) : null}
      </Fragment>
    )}
  </form>
);
