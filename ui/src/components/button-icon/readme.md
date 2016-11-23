# `<ButtonIcon>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const ButtonIcon = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <ButtonIcon iconSet='fa' name='beer' />
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const ButtonIcon = require('ui/button-icon');

module.exports = () => {
  return (
    <ButtonIcon iconSet='fa' name='beer' />
  );
}
```
