const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const _table = require('./');

const {
  Table,
  TableHead,
  TableItem,
  TableBody,
  TableRow
} = _table;

storiesOf('Table - Simple', module)
  .add('Default', () => (
    <Base>
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
    </Base>
  ));
