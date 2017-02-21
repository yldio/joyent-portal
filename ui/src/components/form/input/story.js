const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Input = require('../input');
const FormMeta = require('../meta');
const FormGroup = require('../group');
const Label = require('../label');

storiesOf('Input', module)
  .add('Default', () => (
    <Input placeholder="I am the placeholder" />
  ))
  .add('type=email', () => (
    <FormGroup>
      <Label>Email Address</Label>
      <Input
        placeholder='Enter email'
        type='email'
      />
      <small>We&apos;ll never share your email with anyone else.</small>
    </FormGroup>
  ))
  .add('Error', () => (
    <div>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta error='Unexpected inline error!' />
      </FormGroup>
      <FormGroup error='Unexpected group error!'>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta />
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{error: 'Unexpected meta error!'}}>
        {/* eslint-enable object-curly-newline */}
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta />
      </FormGroup>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta error>
          Unexpected children error!
        </FormMeta>
      </FormGroup>
    </div>
  ))
  .add('Warning', () => (
    <div>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta warning='Unexpected inline warning!' />
      </FormGroup>
      <FormGroup warning='Unexpected group warning!'>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta />
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{warning: 'Unexpected meta warning!'}}>
        {/* eslint-enable object-curly-newline */}
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta />
      </FormGroup>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta warning>
          Unexpected children warning!
        </FormMeta>
      </FormGroup>
    </div>
  ))
  .add('Success', () => (
    <div>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta success='Unexpected inline success!' />
      </FormGroup>
      <FormGroup success='Unexpected group success!'>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta />
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{success: 'Unexpected meta success!'}}>
        {/* eslint-enable object-curly-newline */}
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta />
      </FormGroup>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          placeholder='Enter email'
          type='email'
        />
        <FormMeta success>
          Unexpected children success!
        </FormMeta>
      </FormGroup>
    </div>
  ))
  .add('Base meta', () => (
    <FormGroup>
      <Label>Email Address</Label>
      <Input
        placeholder='Enter email'
        type='email'
      />
      <FormMeta>I&#39;m a children of meta</FormMeta>
    </FormGroup>
  ));
