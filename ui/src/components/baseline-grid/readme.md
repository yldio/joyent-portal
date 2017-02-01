# `<Icon>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Icon = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Icon iconSet='fa' name='beer' />
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Icon = require('ui/icon');

module.exports = () => {
  return (
    <Icon iconSet='fa' name='beer' />
  );
}
```
