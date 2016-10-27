# `<RadioGroup>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Container = require('../container');
const Row = require('../row');
const Column = require('../column');
const Radio = require('../radio');
const RadioGroup = require('./index');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column>
        <RadioGroup name='mode'>
          <Radio label='Default settings' value='default'>
            <p>You get all the good bits and none of the rubbish</p>
          </Radio>
          <Radio label='Fancy settings' value='fancy'>
            <p>You get all the good bits and extra brownies</p>
          </Radio>
          <Radio disabled label='No settings' value='none'>
            <p>You get none of the good bits</p>
          </Radio>
        </RadioGroup>
      </Column>
    </Row>
  </Base>
);
```