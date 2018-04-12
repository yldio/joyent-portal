import React, { PureComponent, Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';

import { FormGroup, H3 } from 'joyent-ui-toolkit';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

class EditorField extends PureComponent {
  render() {
    return <Editor {...this.props} onBlur={null} mode="sh" />;
  }
}

export default () => (
  <form name="user-script">
    <FormGroup name="value" field={Field} fluid>
      <Field name="value" component={EditorField} />
    </FormGroup>
  </form>
);

export const Overview = ({ lines }) => (
  <Margin top={3}>
    {lines ? (
      <Fragment>
        <H3>
          {lines} line{lines === 1 ? '' : 's'} of code
        </H3>
      </Fragment>
    ) : (
      <H3>No user script added</H3>
    )}
  </Margin>
);
