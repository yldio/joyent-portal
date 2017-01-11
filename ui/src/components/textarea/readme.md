# Input

## demo

```embed
const  React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Input = require('./index.js');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Input
          placeholder='Enter email'
          label='Email Address'
          type='email'
        >
          <small>We'll never share your email with anyone else.</small>
        </Input>
      </Column>
    </Row>
    <Row>
      <Column>
        <Input placeholder='Password' type='password'>
          Password
        </Input>
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Input = require('ui/input');

module.exports = () => {
  return (
    <div>
      <Input
        placeholder='Enter email'
        label='Email Address'
        type='email'
      >
        <small>We'll never share your email with anyone else.</small>
      </Input>
      <Input placeholder='Password' type='password'>
        Password
      </Input>
    </div>
  );
}
```
