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
        <Avatar name='Alex' />
      </Column>
      <Column>
        <Avatar name='Alex' image='https://openclipart.org/image/2400px/svg_to_png/177482/ProfilePlaceholderSuit.png' />
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
    <Avatar name='Alex' />
    <Avatar name='Alex' image='path/to/image.png' />
  );
}
```
