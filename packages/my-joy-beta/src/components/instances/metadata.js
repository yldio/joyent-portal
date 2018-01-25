import React from 'react';

import KeyValue from '@components/key-value';

export const AddForm = props => (
  <KeyValue {...props} method="add" input="textarea" type="metadata" expanded />
);

export const EditForm = props => (
  <KeyValue {...props} method="edit" input="textarea" type="metadata" />
);
