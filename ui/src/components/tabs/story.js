const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Tabs = require('./');
const Tab = require('./tab');

storiesOf('Tabs', module)
  .add('Default', () => (
    <Tabs name='my-tab-group'>
      <Tab title='Containers'>
        <h1>Containers</h1>
      </Tab>
      <Tab title='Users'>
        <h1>User</h1>
      </Tab>
    </Tabs>
  ));