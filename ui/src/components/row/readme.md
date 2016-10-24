# `<Row>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Row = require('./index.js');
const Grid = require('../grid');
const Button = require('../button');

nmodule.exports = ReactDOM.renderToString(
  <Grid>
    <Row center='xs' start='sm'>
      <Button>1</Button>
      <Button>2</Button>
    </Row>
  </Grid>
);
```

## usage
