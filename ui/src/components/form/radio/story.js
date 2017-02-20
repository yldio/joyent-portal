import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Legend from '../legend';
import Radio, { RadioList } from '../radio';
import FormGroup from '../group';
import FormMeta from '../meta';

storiesOf('Radio', module)
  .add('Default', () => (
    <FormGroup name='who-killed'>
      <Legend>Who killed the radio star?</Legend>
      <RadioList>
        <Radio value='video'>Video</Radio>
        <Radio value='tv'>TV</Radio>
        <Radio value='netflix'>Netflix</Radio>
      </RadioList>
    </FormGroup>
  ))
  .add('disabled', () => (
    <FormGroup name='who-killed' disabled>
      <Legend>Who killed the radio star?</Legend>
      <RadioList>
        <Radio value='video'>Video</Radio>
        <Radio value='tv'>TV</Radio>
        <Radio value='netflix'>Netflix</Radio>
      </RadioList>
    </FormGroup>
  ))
  .add('Error', () => (
    <div>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta error='Unexpected inline error!' left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      <FormGroup name='who-killed' error='Unexpected group error!'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup name='who-killed' meta={{error: 'Unexpected meta error!'}}>
        {/* eslint-enable object-curly-newline */}
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta error left>
          Unexpected children error!
        </FormMeta>
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
    </div>
  ))
  .add('Warning', () => (
    <div>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta warning='Unexpected inline warning!' left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      <FormGroup name='who-killed' warning='Unexpected group warning!'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup name='who-killed' meta={{warning: 'Unexpected meta warning!'}}>
        {/* eslint-enable object-curly-newline */}
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left warning>
          Unexpected children warning!
        </FormMeta>
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
    </div>
  ))
  .add('Success', () => (
    <div>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta success='Unexpected inline success!' left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      <FormGroup name='who-killed' success='Unexpected group success!'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      {/* eslint-disable object-curly-newline */}
      <FormGroup name='who-killed' meta={{success: 'Unexpected meta success!'}}>
        {/* eslint-enable object-curly-newline */}
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left />
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
      <FormGroup name='who-killed'>
        <Legend>Who killed the radio star?</Legend>
        <FormMeta left success>
          Unexpected children success!
        </FormMeta>
        <RadioList>
          <Radio value='video'>Video</Radio>
          <Radio value='tv'>TV</Radio>
          <Radio value='netflix'>Netflix</Radio>
        </RadioList>
      </FormGroup>
    </div>
  ))
  .add('Base meta', () => (
    <FormGroup name='who-killed'>
      <Legend>Who killed the radio star?</Legend>
      <FormMeta left>I&#39;m a children of meta</FormMeta>
      <RadioList>
        <Radio value='video'>Video</Radio>
        <Radio value='tv'>TV</Radio>
        <Radio value='netflix'>Netflix</Radio>
      </RadioList>
    </FormGroup>
  ));
