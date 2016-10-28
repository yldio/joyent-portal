# `<Widget>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Widget = require('./index.js');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <h2>Single Option Select</h2>
    <Row>
      <Column xs={2}>
        <Widget checked selectable="single" name='flag' value='flag_1'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png" />
          <p>Some text</p>
        </Widget>
      </Column>

      <Column xs={2}>
        <Widget selectable="single" name='flag' value='flag_2'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png" />
          <p>Some text</p>
        </Widget>
      </Column>
    </Row>

    <h2>Multi Option Select</h2>
    <Row>
      <Column xs={2}>
        <Widget checked selectable="multiple" name='flag_3'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png" />
          <p>Some text</p>
        </Widget>
      </Column>

      <Column xs={2}>
        <Widget checked selectable="multiple" name='flag_4'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png" />
          <p>Some text</p>
        </Widget>
      </Column>

      <Column xs={2}>
        <Widget selectable="multiple" name='flag_5'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png" />
          <p>Some text</p>
        </Widget>
      </Column>
    </Row>

    <h2>Disabled</h2>
    <Row>
      <Column xs={2}>
        <Widget selectable="multiple" name='flag_5' disabled>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png" />
          <p>Some text</p>
        </Widget>
      </Column>
    </Row>
  </Base>
);
```

## usage

```js
const React = require('react');
const Widget = require('ui/widget');

// For Single Select
module.exports = () => {
  return (
    <Widget selectable="single" name='flag' value="flag_1">
      <img src="someimage.png" />
      <p>Some text</p>
    </Widget>

    <Widget selectable="multiple" name='flag' value="flag_2">
      <img src="someimage.png" />
      <p>Some text</p>
    </Widget>
  );
}

// For Multiple Selection
module.exports = () => {
  return (
    <Widget selectable="single" name='flag_3'>
      <img src="someimage.png" />
      <p>Some text</p>
    </Widget>

    <Widget selectable="multiple" name='flag_4'>
      <img src="someimage.png" />
      <p>Some text</p>
    </Widget>
  );

// Disabled
module.exports = () => {
  return (
    <Widget disabled selectable="single" name='flag_5'>
      <img src="someimage.png" />
      <p>Some text</p>
    </Widget>
  );
}
```
