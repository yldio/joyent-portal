# `<RangeSlider>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const RangeSlider = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column xs={6}>
        <RangeSlider />
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const RangeSlider = require('ui/range-slider');

module.exports = () => {
  return (
    <RangeSlider />
  );
}
```
