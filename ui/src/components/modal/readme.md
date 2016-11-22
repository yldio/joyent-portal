# `<Modal>    `

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Modal = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>  
        <Modal active name="modal1" >
          Create an Instance
        </Modal>
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Modal = require('ui/button');

module.exports = () => {
  return (
    <Modal>
      Hello World
    </Modal>
  );
}
```
