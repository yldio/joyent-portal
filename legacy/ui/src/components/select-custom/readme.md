# Select


## demo

```embed
const  React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Select = require('./index.js');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column xs={12}>
        <Select label='example select'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Select>
      </Column>
    </Row>
    <Row>
      <Column xs={12}>
        <Select multiple label='example multiple select'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Select>
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Select = require('ui/select');

module.exports = () => {
  return (
    <Select multiple label='example select'>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Select>
  );
}
```
