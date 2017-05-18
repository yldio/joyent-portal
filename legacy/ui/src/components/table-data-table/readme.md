# `<Avatar>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Table = require('./index.js');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Table
      columns={columns}
      data={data}
      title="This is the table title"
    />
  </Base>
);
```

## usage

```js
const React = require('react');
const Avatar = require('ui/table');

const columns = [{
  title: 'Member',
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

module.exports = () => {
  return (
    <Base>
      <Table
        columns={columns}
        data={data}
        title="This is the table title"
      />
    </Base>
  );
}
```
