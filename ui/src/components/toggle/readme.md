# `<Toggle>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Toggle = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>  
    <Row>
      <Column>
        <Toggle checked />
      </Column>
    </Row>
  </Base>
);
```
