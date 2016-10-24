# `<Column>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Grid = require('../grid');
const Row = require('../row');
const Column = require('./index');

const styles = {
  grid: {
    backgroundColor: '#FFEBEE'
  },
  row: {
    backgroundColor: '#EF5350'
  },
  column: {
    backgroundColor: '#B71C1C',
    textAlign: 'center'
  },
  p: {
    color: 'white'
  }
};

nmodule.exports = ReactDOM.renderToString(
  <Grid style={styles.grid}>
    <Row style={styles.row} around>
      <Column style={styles.column} xs={2}>
        <p style={styles.p}>1</p>
      </Column>
      <Column style={styles.column} xs={2}>
        <p style={styles.p}>2</p>
      </Column>
      <Column style={styles.column} xs={2}>
        <p style={styles.p}>3</p>
      </Column>
    </Row>
  </Grid>
);
```

## usage

```js
const React = require('react');
const Grid = require('ui/grid');
const Row = require('ui/row');
const Column = require('ui/index');

module.exports = () => {
  return (
    <Grid>
      <Row around>
        <Column xs={2}>1</Column>
        <Column xs={2}>2</Column>
        <Column xs={2}>3</Column>
      </Row>
    </Grid>
  );
};
```