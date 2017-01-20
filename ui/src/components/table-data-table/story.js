const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const Table = require('./');

const memberDetail = (name) => {
  return (
    <div>
      <h4>{name}</h4>
      <small>{name}@biztech.com</small>
    </div>
  );
};

const columns = [{
  title: 'Memeber',
  width: '50%'
}, {
  title: 'Status',
  width: '10%'
}, {
  title: 'Role',
  width: '20%'
}, {
  title: '',
  width: '20%'
}];

const data = [{
  name: memberDetail('Nicola'),
  status: 'Active',
  role: 'Owner',
  key: 1
}, {
  name: memberDetail('Alex'),
  status: 'Inactive',
  role: 'Read Only',
  key: 2
}];

storiesOf('Table - Data Table', module)
  .add('Default', () => (
    <Base>
      <Table
        columns={columns}
        data={data}
        title="This is the table title"
      />
    </Base>
  ));
