const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const Table = require('./');

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
}, {
  name: 'Alex',
  status: 'Inactive',
  role: 'Read Only',
  key: 2
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
