# `<Pagination>`

## demo

```embed
const  React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Pagination = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Pagination>
          <a>
            <span>&laquo;</span>
            <span>Previous</span>
          </a>
          <a>1</a>
          <a active>2</a>
          <a>3</a>
        </Pagination>
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Radio = require('ui/radio');

module.exports = () => {
  return (
    <Pagination>
      <a>
        <span>&laquo;</span>
        <span>Previous</span>
      </a>
      <a>1</a>
      <a active>2</a>
      <a>3</a>
    </Pagination>
  );
}
```
