import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tabs from './';
import Tab from './tab';

storiesOf('Tabs', module)
  .add('Default', () => (
    <Tabs name='my-tab-group'>
      <Tab title='Your Dashboard'>
        <h1>Containers</h1>
      </Tab>
      <Tab title='YLD'>
        <h1>User</h1>
      </Tab>
    </Tabs>
  ));
