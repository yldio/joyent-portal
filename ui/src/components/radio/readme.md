# `<Radio >`

## demo

```embed
const  React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Radio = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Radio name='gender' value='female' checked={false}>
          Female
        </Radio>
        <Radio name='gender' value='male' checked={true}>
          Male
        </Radio>
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
    <Radio name='gender' value='female' label='Female' />
    <Radio name='gender' value='male' label='Male' checked/>
  );
}
```
