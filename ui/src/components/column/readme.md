# `<Column>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('./index');

const styles = {
  container: {
    backgroundColor: '#FFEBEE'
  },
  row: {
    backgroundColor: '#EF5350'
  },
  column: {
    backgroundColor: '#B71C1C',
    textAlign: 'center',
    color: 'white'
  }
};

nmodule.exports = ReactDOM.renderToString(
  <Container style={styles.container}>
    <Row style={styles.row} around>
      <Column style={styles.column} xs={2}>1</Column>
      <Column style={styles.column} xs={2}>2</Column>
      <Column style={styles.column} xs={2}>3</Column>
    </Row>
  </Container>
);
```

## usage

```js
const React = require('react');
const Container = require('ui/container');
const Row = require('ui/row');
const Column = require('ui/index');

module.exports = () => {
  return (
    <Container>
      <Row around>
        <Column xs={2}>1</Column>
        <Column xs={2}>2</Column>
        <Column xs={2}>3</Column>
      </Row>
    </Container>
  );
};
```