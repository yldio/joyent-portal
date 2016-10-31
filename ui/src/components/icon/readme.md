# `<Checkbox>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Checkbox = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Checkbox checked>
          Checkbox checked
        </Checkbox>
      </Column>
    </Row>
    <Row>
      <Column>
        <Checkbox>
          Checkbox unchecked
        </Checkbox>
      </Column>
    </Row>
    <Row>
      <Column>
        <Checkbox disabled>
          Checkbox disabled
        </Checkbox>
      </Column>
    </Row>
  </Base>
);
```
