const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Tabs = require('./');
const Tab = require('./tab');
const Base = require('../base');

storiesOf('Tabs', module)
  .add('Default', () => (
    <Base>
      <Tabs name='my-tab-group'>
        <Tab title='Your Dashboard'>
          <h1>Containers</h1>
        </Tab>
        <Tab title='YLD'>
          <h1>User</h1>
        </Tab>
      </Tabs>
    </Base>
  ));