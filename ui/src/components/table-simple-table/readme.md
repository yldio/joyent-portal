# `<Avatar>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Avatar = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <Avatar color='#35a8c0' name='Alex' />
      </Column>
      <Column>
        <Avatar color='#ef6176' name='Alex' src='https://openclipart.org/image/2400px/svg_to_png/177482/ProfilePlaceholderSuit.png' />
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Avatar = require('ui/avatar');

module.exports = () => {
  return (
    <Avatar color='#35a8c0' name='Alex' />
    <Avatar color='#ef6176' name='Alex' src='path/to/image.png' />
  );
}
```
