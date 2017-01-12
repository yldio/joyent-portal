const React = require('react');
const fakeData = require('../../shared/fake-data');
const Base = require('../base');

const {
  profile
} = fakeData;

const {
  storiesOf
} = require('@kadira/storybook');

const Avatar = require('./');

storiesOf('Avatar', module)
  .add('Avatar Picture', () => (
    <Base>
      <Avatar
        color='#ef6176'
        name='Tom'
        src={profile}
      />
    </Base>
  ))
  .add('Avatar Text', () => (
    <Base>
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
    </Base>
  ));