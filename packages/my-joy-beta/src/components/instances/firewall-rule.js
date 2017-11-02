import React from 'react';

import { TableTr, TableTd } from 'joyent-ui-toolkit';

export default ({ rule = '', global = false, enabled = false }) => (
  <TableTr>
    <TableTd>
      <code>{rule}</code>
    </TableTd>
    <TableTd center middle>
      <code>{JSON.stringify(global)}</code>
    </TableTd>
    <TableTd center middle>
      <code>{JSON.stringify(enabled)}</code>
    </TableTd>
  </TableTr>
);
