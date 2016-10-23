# `<Button>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Button = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Button>Hello World</Button>
);
```

## usage

```js
const React = require('react');
const Button = require('ui/button');

module.exports = () => {
  return (
    <Button disabled={false}>
      Hello World
    </Button>
  );
}
```
