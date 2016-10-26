# `<Button>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Button = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Container>
      <Row>
        <Column>
          <Button>
            Create an Instance
          </Button>
        </Column>
        <Column>
          <Button secundary>
            Cancel
          </Button>
        </Column>
        <Column>
          <Button disabled>
            Inactive Button
          </Button>
        </Column>
      </Row>
    </Container>
  </Base>
);
```

## usage

```js
const React = require('react');
const Button = require('ui/button');

module.exports = () => {
  return (
    <Button>
      Hello World
    </Button>
  );
}
```
