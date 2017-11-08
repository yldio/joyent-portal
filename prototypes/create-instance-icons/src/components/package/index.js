import React from 'react';
import { reduxForm } from 'redux-form';

import { returnIcon } from '../icons';

import {
  TableTr,
  TableTd,
  H4,
  Label,
  Radio,
  FormGroup
} from 'joyent-ui-toolkit';


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
    <TableTd right>
      {memory > 1 ? `${memory} GB` : `${memory * 1000} MB`}
    </TableTd>
    <TableTd right>{disk > 1 ? `${disk} TB` : `${disk * 1000} GB`}</TableTd>
    <TableTd right>{vcpus}</TableTd>
    <TableTd right>{price.toFixed(3)}</TableTd>
  </TableTr>
);

export default reduxForm({ form: 'selected' })(Package);
