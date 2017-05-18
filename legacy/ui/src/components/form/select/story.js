import { storiesOf } from '@kadira/storybook';
import React from 'react';
import FormMeta from '../meta';
import FormGroup from '../group';
import Select from '../select';
import Label from '../label';

storiesOf('Select', module)
  .add('Default', () => (
    <FormGroup>
      <Label>Your location</Label>
      <Select placeholder='Select Location'>
        <option value='1'>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </FormGroup>
  ))
  .add('placeholder', () => (
    <Select>
      <Label>Your location</Label>
      <option selected disabled>Select a datacenter</option>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
  ))
  .add('disabled', () => (
    <FormGroup>
      <Label>Your location</Label>
      <Select
        disabled
        placeholder='Select Location'
        value='2'
      >
        <option value='1'>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </FormGroup>
  ))
  .add('selected', () => (
    <FormGroup>
      <Label>Your location</Label>
      <Select
        placeholder='Select Location'
        value='2'
      >
        <option value='1'>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </FormGroup>
  ))
  .add('multiple', () => (
    <FormGroup>
      <Label>Your location</Label>
      <Select multiple>
        <option>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
    </FormGroup>
  ))
  .add('warning', () => (
    <div>
      <FormGroup>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta warning='Unexpected inline warning!' />
      </FormGroup>
      <FormGroup warning='Unexpected group warning!'>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta />
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{warning: 'Unexpected meta warning!'}}>
        {/* eslint-enable object-curly-newline */}
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta />
      </FormGroup>
      <FormGroup>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta warning>
          Unexpected children warning!
        </FormMeta>
      </FormGroup>
    </div>
  ))
  .add('error', () => (
    <div>
      <FormGroup>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta error='Unexpected inline error!' />
      </FormGroup>
      <FormGroup error='Unexpected group error!'>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta />
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{error: 'Unexpected meta error!'}}>
        {/* eslint-enable object-curly-newline */}
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta />
      </FormGroup>
      <FormGroup>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta error>
          Unexpected children error!
        </FormMeta>
      </FormGroup>
    </div>
  ))
  .add('success', () => (
    <div>
      <FormGroup>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta success='Unexpected inline success!' />
      </FormGroup>
      <FormGroup success='Unexpected group success!'>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta />
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup meta={{success: 'Unexpected meta success!'}}>
        {/* eslint-enable object-curly-newline */}
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta />
      </FormGroup>
      <FormGroup>
        <Label>Your location</Label>
        <Select>
          <option>Amsterdam, EU</option>
          <option>San Francisco, USA</option>
          <option>Seoul, South Korea</option>
          <option>Tokyo, Japan</option>
        </Select>
        <FormMeta success>
          Unexpected children success!
        </FormMeta>
      </FormGroup>
    </div>
  ))
  .add('Base meta', () => (
    <FormGroup>
      <Label>Your location</Label>
      <Select>
        <option>Amsterdam, EU</option>
        <option>San Francisco, USA</option>
        <option>Seoul, South Korea</option>
        <option>Tokyo, Japan</option>
      </Select>
      <FormMeta>
        I&#39;m a children of meta!
      </FormMeta>
    </FormGroup>
  ));
