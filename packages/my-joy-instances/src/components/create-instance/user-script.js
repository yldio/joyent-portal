import React, { PureComponent, Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';

import { FormGroup, Button, H3, P } from 'joyent-ui-toolkit';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

class EditorField extends PureComponent {
  render() {
    return <Editor {...this.props} onBlur={null} mode="sh" />;
  }
}

export default ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <FormGroup name="value" field={Field} fluid>
      <Field name="value" component={EditorField} />
      <Margin bottom={4} top={4}>
        <Button type="submit">Next</Button>
      </Margin>
    </FormGroup>
  </form>
);

export const Overview = ({ script, lines }) => (
  <Margin top={3}>
    {script ? (
      <Fragment>
        <H3 noMargin>User script added</H3>
        <Margin top={2}>
          <P>
            {lines} line{lines === 1 ? '' : 's'} of code
          </P>
        </Margin>
      </Fragment>
    ) : (
      <H3>No user script added</H3>
    )}
  </Margin>
);
