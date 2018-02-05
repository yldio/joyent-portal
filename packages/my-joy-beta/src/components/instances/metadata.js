import React from 'react';

import { KeyValue } from 'joyent-ui-toolkit';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

export const AddForm = props => (
  <KeyValue
    {...props}
    method="add"
    input="textarea"
    type="metadata"
    editor={Editor}
    expanded
  />
);

export const EditForm = props => (
  <KeyValue
    {...props}
    method="edit"
    input="textarea"
    type="metadata"
    editor={Editor}
  />
);
