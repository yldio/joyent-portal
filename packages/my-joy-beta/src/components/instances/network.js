import React from 'react';
import forceArray from 'force-array';

import { TableTr, TableTd } from 'joyent-ui-toolkit';

export default ({ name, gateway, subnet, resolvers = [] }) => (
  <TableTr>
    <TableTd>{name}</TableTd>
    <TableTd>{gateway}</TableTd>
    <TableTd>{subnet}</TableTd>
    <TableTd>{forceArray(resolvers).join('\u00B7')}</TableTd>
  </TableTr>
);
