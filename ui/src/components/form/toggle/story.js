import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Legend from '../legend';
import Toggle, { ToggleList } from '../toggle';
import FormGroup from '../group';
import FormMeta from '../meta';

storiesOf('Toggle', module)
.add('Default', () => (
  <FormGroup name='who-killed'>
    <Legend>Who killed the radio star?</Legend>
    <ToggleList>
      <Toggle value='video'>Video</Toggle>
      <Toggle value='tv'>TV</Toggle>
      <Toggle value='netflix'>Netflix</Toggle>
    </ToggleList>
  </FormGroup>
  ))
  .add('Selected', () => (
    <FormGroup name='who-killed'>
      <Legend>Who killed the radio star?</Legend>
      <ToggleList>
        <Toggle value='video' checked>Video</Toggle>
        <Toggle value='tv'>TV</Toggle>
        <Toggle value='netflix'>Netflix</Toggle>
      </ToggleList>
    </FormGroup>
  ))
  .add('Two items', () => (
    <FormGroup name='who-killed'>
      <Legend>Who killed the radio star?</Legend>
      <ToggleList>
        <Toggle value='tv' checked>TV</Toggle>
        <Toggle value='netflix'>Netflix</Toggle>
      </ToggleList>
    </FormGroup>
  ))
  .add('Disabled', () => (
    <FormGroup name='who-killed' disabled>
      <Legend>Who killed the radio star?</Legend>
      <ToggleList>
        <Toggle value='video'>Video</Toggle>
        <Toggle value='tv'>TV</Toggle>
        <Toggle value='netflix'>Netflix</Toggle>
      </ToggleList>
    </FormGroup>
  ))
  .add('Error', () => (
    <div>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta error='Unexpected inline error!' left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      <FormGroup name='who-killed' error='Unexpected group error!'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup name='who-killed' meta={{error: 'Unexpected meta error!'}}>
        {/* eslint-enable object-curly-newline */}
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta error left>
          Unexpected children error!
        </FormMeta>
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
    </div>
  ))
  .add('Warning', () => (
    <div>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta warning='Unexpected inline warning!' left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      <FormGroup name='who-killed' warning='Unexpected group warning!'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup name='who-killed' meta={{warning: 'Unexpected meta warning!'}}>
        {/* eslint-enable object-curly-newline */}
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left warning>
          Unexpected children warning!
        </FormMeta>
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
    </div>
  ))
  .add('Success', () => (
    <div>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta success='Unexpected inline success!' left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      <FormGroup name='who-killed' success='Unexpected group success!'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup name='who-killed' meta={{success: 'Unexpected meta success!'}}>
        {/* eslint-enable object-curly-newline */}
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left success>
          Unexpected children success!
        </FormMeta>
        <ToggleList>
          <Toggle value='video'>Video</Toggle>
          <Toggle value='tv'>TV</Toggle>
          <Toggle value='netflix'>Netflix</Toggle>
        </ToggleList>
      </FormGroup>
    </div>
  ))
  .add('Base meta', () => (
    <FormGroup name='who-killed'>
      <Legend>Who killed the radio star?</Legend>
      <FormMeta left>I&#39;m a children of meta</FormMeta>
      <ToggleList>
        <Toggle value='video'>Video</Toggle>
        <Toggle value='tv'>TV</Toggle>
        <Toggle value='netflix'>Netflix</Toggle>
      </ToggleList>
    </FormGroup>
  ));
