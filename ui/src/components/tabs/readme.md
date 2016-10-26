# `<Tabs>`

## demo

```embed
const React = require('react');
const ReactDOM = require('react-dom/server');
const Base = require('../base');
const Row = require('../row');
const Column = require('../column');
const Tabs = require('./index');
const Tab = require('../tab');
const styles = require('./style.css');

nmodule.exports = ReactDOM.renderToString(
  <Base>
    <Row>
      <Column xs={12}>
        <Tabs name='my-tab-group'>
          <Tab title='Containers'>
            <h1>Containers</h1>
          </Tab>
          <Tab title='Users'>
            <h1>User</h1>
          </Tab>
        </Tabs>
      </Column>
    </Row>
  </Base>
);
```
