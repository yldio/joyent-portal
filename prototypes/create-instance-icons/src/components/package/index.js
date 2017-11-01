import React from 'react';

import { TableTr, TableTd, H4 } from 'joyent-ui-toolkit';
import { returnIcon } from '../icons';

const Package = ({
  pack: { price, memory, vcpus, disk, group, ssd, name },
  selected,
  onClick
}) => (
  <TableTr actionable selected={selected} onClick={onClick}>
    <TableTd>
      {returnIcon(group)}
      <H4>{name}</H4>
    </TableTd>
    <TableTd right>
      {memory > 1 ? `${memory} GB` : `${memory * 1000} MB`}
    </TableTd>
    <TableTd right>
      {disk > 1 ? `${disk} TB` : `${disk * 1000} GB`}
    </TableTd>
    <TableTd right>{vcpus}</TableTd>
    <TableTd right>{price}</TableTd>
  </TableTr>
);

export default Package;
