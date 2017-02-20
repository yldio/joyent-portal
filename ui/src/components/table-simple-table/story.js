import { storiesOf } from '@kadira/storybook';
import React from 'react';

import {
  Table,
  TableHead,
  TableItem,
  TableBody,
  TableRow
} from './';

storiesOf('Table - Simple', module)
  .add('Default', () => (
    <Table>
      <TableHead>
        <TableItem>Member</TableItem>
        <TableItem>Status</TableItem>
        <TableItem>Role</TableItem>
        <TableItem>{/*Empty last Column*/}</TableItem>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableItem>
            <h4>Nicola (You)</h4>
            <p>nicola@biztech.com</p>
          </TableItem>
          <TableItem>Active</TableItem>
          <TableItem>Owner</TableItem>
          <TableItem>🗑️</TableItem>
        </TableRow>
        <TableRow>
          <TableItem>
            <h4>Nicola (You)</h4>
            <p>nicola@biztech.com</p>
          </TableItem>
          <TableItem>Active</TableItem>
          <TableItem>Owner</TableItem>
          <TableItem>🗑️</TableItem>
        </TableRow>
      </TableBody>
    </Table>
  ));
