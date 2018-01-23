import React from 'react';
import { Margin } from 'styled-components-spacing';

import { TagItem } from 'joyent-ui-toolkit';
import KeyValue from '@components/key-value';

export const AddForm = props => (
  <KeyValue {...props} method="add" input="input" type="tag" expanded />
);

export const EditForm = props => (
  <KeyValue {...props} method="edit" input="input" type="tag" expanded />
);

export default ({ name, value, onClick, onRemoveClick, active }) => (
  <Margin right={1} bottom={1} key={`${name}-${value}`}>
    <TagItem onClick={onClick} active={active} onRemoveClick={onRemoveClick}>
      {name ? `${name}: ${value}` : value}
    </TagItem>
  </Margin>
);
