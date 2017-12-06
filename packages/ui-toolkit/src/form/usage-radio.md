####  Radio > Default

```jsx
const React = require('react');
const { default: Radio, RadioList } = require('./radio');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Legend } = require('./legend');
const { FormLabel } = require('./');

<FormGroup name="who-killed">
  <FormLabel style={{marginBottom: '12px'}}>Who killed the radio star?</FormLabel>
  <RadioList>
    <Radio name="one" value="video">
      <Label>Video</Label>
    </Radio>
    <Radio name="one" value="tv">
      <Label>TV</Label>
    </Radio>
    <Radio name="one" value="netflix">
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
</FormGroup>;
```
####  Checkbox > Active/Focused
```jsx
const React = require('react');
const { default: Radio, RadioList } = require('./radio');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Legend } = require('./legend');
const { FormLabel } = require('./');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Who killed the radio star?</FormLabel>
  <RadioList>
    <Radio name="one" value="video" checked>
      <Label>Video</Label>
    </Radio>
    <Radio name="one" value="tv">
      <Label>TV</Label>
    </Radio>
    <Radio name="one" value="netflix">
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
</FormGroup>
```

####  Checkbox > Disabled
```jsx
const React = require('react');
const { default: Radio, RadioList } = require('./radio');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Legend } = require('./legend');
const { FormLabel } = require('./');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Who killed the radio star?</FormLabel>
  <RadioList>
    <Radio name="one" value="video" disabled>
      <Label>Video</Label>
    </Radio>
    <Radio name="one" value="tv" disabled>
      <Label>TV</Label>
    </Radio>
    <Radio name="one" value="netflix" disabled>
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
</FormGroup>
```
#### Radio input validation

```jsx
const React = require('react');
const { default: Radio, RadioList } = require('./radio');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Legend } = require('./legend');
const { FormLabel } = require('./');
const { default: FormMeta } = require('./meta');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Who killed the radio star?</FormLabel>
  <RadioList>
    <Radio name="one" value="video" error>
      <Label>Video</Label>
    </Radio>
    <Radio name="one" value="tv" error>
      <Label>TV</Label>
    </Radio>
    <Radio name="one" value="netflix" error>
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
  <FormMeta error>
    Something’s missing
  </FormMeta>
</FormGroup>
```