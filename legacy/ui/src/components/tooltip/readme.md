# `<Tooltip>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Tooltip = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Tooltip color='#35a8c0' name='Alex' />
      </Column>
      <Column>
        <Tooltip color='#ef6176' name='Alex' src='https://openclipart.org/image/2400px/svg_to_png/177482/ProfilePlaceholderSuit.png' />
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Tooltip = require('ui/avatar');

module.exports = () => {
  return (
    <Tooltip color='#35a8c0' name='Alex' />
    <Tooltip color='#ef6176' name='Alex' src='path/to/image.png' />
  );
}
```
