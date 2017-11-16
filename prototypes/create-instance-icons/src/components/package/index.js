import React from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { returnIcon } from '../icons';

import { TableTr, TableTd, H4, Radio, FormGroup } from 'joyent-ui-toolkit';

const FormGroupStyled = styled(FormGroup)`
  float: left;
  margin-right: ${remcalc(24)};
  margin-top: ${remcalc(3)};
`;

const Package = ({
  pack: { price, memory, vcpus, disk, group, ssd, name },
  selected,
  onClick
}) => (
  <TableTr selected={selected}>
    <TableTd>
      <FormGroupStyled name={name}>
        <Radio onClick={onClick} name={name} value={name} checked={selected} />
      </FormGroupStyled>
      {returnIcon(group)}
      <H4>{name}</H4>
    </TableTd>
    <TableTd right>
      {memory > 1 ? `${parseInt(memory, 10)} GB` : `${memory * 1000} MB`}
    </TableTd>
    <TableTd right>{disk > 1 ? `${disk} TB` : `${disk * 1000} GB`}</TableTd>
    <TableTd right>{vcpus}</TableTd>
    <TableTd right>{price.toFixed(3)}</TableTd>
  </TableTr>
);

export default reduxForm({ form: 'selected' })(Package);
