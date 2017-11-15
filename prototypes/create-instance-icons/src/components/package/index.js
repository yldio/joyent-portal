import React from 'react';
import { reduxForm } from 'redux-form';

import { returnIcon } from '../icons';

import { TableTr, TableTd, H4, Radio, FormGroup } from 'joyent-ui-toolkit';

const Package = ({
  pack: { price, memory, vcpus, disk, group, ssd, name },
  selected,
  onClick
}) => (
  <TableTr selected={selected}>
    <TableTd>
      <FormGroup name={name}>
        <Radio onClick={onClick} name={name} value={name} checked={selected} />
      </FormGroup>
    </TableTd>
    <TableTd>
      {returnIcon(group)}
      <H4>{name}</H4>
    </TableTd>
    <TableTd>
      {memory > 1 ? `${parseInt(memory, 10)} GB` : `${memory * 1000} MB`}
    </TableTd>
    <TableTd>{disk > 1 ? `${disk} TB` : `${disk * 1000} GB`}</TableTd>
    <TableTd>{vcpus}</TableTd>
    <TableTd>{price.toFixed(3)}</TableTd>
  </TableTr>
);

export default reduxForm({ form: 'selected' })(Package);
