# `<Notification>`

## demo

```embed  
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Notificaton = require('./index.js');
const styles = require('./style.css');

const style = {
  marginBottom: 0
}

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Notificaton type='warning' icon='exclamation'>
          <p style={style}>This is the warning content</p>
        </Notificaton>
      </Column>
    </Row>
    <Row>
      <Column>
        <Notificaton type='warning' icon='question'>
          <p style={style}>This is the question content</p>   
        </Notificaton>
      </Column>
    </Row>
    <Row>
      <Column>
        <Notificaton type='warning' icon='question'>
          <p style={style}>This is the question content</p>   
        </Notificaton>
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Notificaton = require('ui/avatar');

module.exports = () => {
  return (
    <Notificaton type='warning' icon='exclamation'>  
      <p>This is the warning content</p>
    </Notificaton>
    <Notificaton type='warning' icon='question'>
      <p>This is the warning content</p>
    </Notificaton>
    <Notificaton type='warning' icon='question'>
      <p>This is the warning content</p>
    </Notificaton>
  );
}
```
