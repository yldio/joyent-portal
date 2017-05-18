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

const trigger = () => {
  return (
    <p>This is the trigger</p>
  )
};

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>  
        <Modal name="modal1" trigger={trigger} >
          <h2>This is the Modal</h2>
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

const trigger = () => {
  return (
    <p>This is the trigger</p>
  )
};

module.exports = () => {
  return (
    <Modal name="modal1" trigger={trigger} >
      <h2>This is the Modal</h2>
    </Modal>
  );
}
```
