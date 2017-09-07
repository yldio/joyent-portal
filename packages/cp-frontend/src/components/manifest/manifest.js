import React from 'react';
import { FormMeta, Button, Label } from 'joyent-ui-toolkit';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import { Field } from 'redux-form';
import { MEditor } from './editors';

const ButtonsRow = Row.extend`margin: ${remcalc(29)} 0 ${remcalc(60)} 0;`;

export const Manifest = ({
  handleSubmit,
  onCancel,
  dirty,
  defaultValue = '',
  loading
}) => (
  <form onSubmit={handleSubmit}>
    <FormMeta left>
      <Label>Project manifest</Label>
    </FormMeta>
    <Field name="manifest" defaultValue={defaultValue} component={MEditor} />
    <ButtonsRow>
      <Button type="button" onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button
        disabled={!(dirty || !loading || defaultValue.length)}
        loading={loading}
        type="submit"
      >
        Environment
      </Button>
    </ButtonsRow>
  </form>
);

export default Manifest;