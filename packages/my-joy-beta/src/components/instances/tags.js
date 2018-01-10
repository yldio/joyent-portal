import React from 'react';
import { Margin } from 'styled-components-spacing';
import { KeyValue } from '@components/instances';

import { TagItem } from 'joyent-ui-toolkit';

export const AddForm = props => (
  <KeyValue {...props} method="add" input="input" type="tag" expanded />
);

export const EditForm = props => (
  <KeyValue {...props} method="edit" input="input" type="tag" expanded />
);

export default ({ name, value, onClick, onRemoveClick }) => (
  <Margin right={1} bottom={1} key={`${name}-${value}`}>
    <TagItem onClick={onClick} onRemoveClick={onRemoveClick}>
      {name}: {value}
    </TagItem>
  </Margin>
);
