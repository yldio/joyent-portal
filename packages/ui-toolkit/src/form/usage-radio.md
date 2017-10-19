```jsx
const React = require('react');
const { default: Radio, RadioList } = require('./radio');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Legend } = require('./legend');

<FormGroup name="who-killed">
  <Legend>Who killed the radio star?</Legend>
  <RadioList>
    <Radio name="one" value="video" checked>
      <Label>Video</Label>
    </Radio>
    <Radio name="one" value="tv">
      <Label>TV</Label>
    </Radio>
    <Radio disabled name="one" value="netflix">
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
</FormGroup>;
```

#### Radio input validation

```jsx
const React = require('react');
const { default: Radio, RadioList } = require('./radio');
const { default: FormGroup } = require('./group');
const { default: Legend } = require('./legend');
const { default: FormMeta } = require('./meta');
const { default: Label } = require('./label');

<div>
  <FormGroup name="who-killed">
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio name="two" success value="video">
        <Label>Video</Label>
      </Radio>
      <Radio name="two" success checked value="tv">
        TV
      </Radio>
      <Radio name="two" success value="netflix">
        Netflix
      </Radio>
    </RadioList>
    <FormMeta left success>
      You are the best !
    </FormMeta>
  </FormGroup>
  <FormGroup name="who-killed">
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio name="three" warning checked value="video">
        <Label>Video</Label>
      </Radio>
      <Radio name="three" warning value="tv">
        TV
      </Radio>
      <Radio name="three" warning value="netflix">
        Netflix
      </Radio>
    </RadioList>
    <FormMeta left warning>
      Are you sure ?
    </FormMeta>
  </FormGroup>
  <FormGroup name="who-killed">
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio name="four" error value="video">
        <Label>Video</Label>
      </Radio>
      <Radio name="four" error value="tv">
        TV
      </Radio>
      <Radio name="four" error value="netflix">
        Netflix
      </Radio>
    </RadioList>
    <FormMeta error left>
      You need to select one
    </FormMeta>
  </FormGroup>
</div>;
```
