# `<Row>`

## demo

```embed
const styleSheet = require('styled-components/lib/models/StyleSheet')
const React = require('react');
const ReactDOM = require('react-dom/server');
const Row = require('./index.js');
const Container = require('../container');
// const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')

nmodule.exports = ReactDOM.renderToString(
  <Row center='xs' start='sm'>
    <pre>{styleSheet}</pre>
    <button>1</button>
    <button>2</button>
  </Row>
);
```

## usage
