const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const _table = require('./');

const {
  Table,
  // TableHead,
  // TableBody,
  // TableRow,
  // TableItem
} = _table;

const columns = [{
  title: 'Memeber',
  dataID: 'member',
  dataKey: 'member',
  width: ''
}, {
  title: 'Status',
  dataID: 'status',
  dataKey: 'status',
  width: ''
}, {
  title: 'Role',
  dataID: 'role',
  dataKey: 'role',
  width: ''
}, {
  title: '',
  dataID: 'delete',
  dataKey: 'delete',
  width: ''
}];

const data = [{
  name: 'Nicola',
  status: 'Active',
  role: 'Owner',
  key: 1
}];

storiesOf('Table New', module)
  .add('Table New', () => (
    <Base>
      <Table
        columns={columns}
        data={data}
        title="This is the table title"
      />
    </Base>
  ));
