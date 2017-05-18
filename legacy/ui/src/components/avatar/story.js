import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { profile } from '../../shared/fake-data';
import Avatar from './';

storiesOf('Avatar', module)
  .add('Avatar Picture', () => (
    <Avatar
      color='#ef6176'
      name='Tom'
      src={profile}
    />
  ))
  .add('Avatar Text', () => (
    <div>
      <Avatar
        color='#35a8c0'
        name='Alex'
      />
      <Avatar
        color='#35a8c0'
        name='Thomas'
      />
      <Avatar
        color='#35a8c0'
        name='귀여운 오리'
      />
    </div>
  ));
