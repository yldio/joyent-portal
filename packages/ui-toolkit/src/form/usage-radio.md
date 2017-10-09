```jsx
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Label = require('./label').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed'>
  <Legend>Who killed the radio star?</Legend>
  <RadioList>
    <Radio name="one" value='video' checked>
      <Label>Video</Label>
    </Radio>
    <Radio name="one" value='tv'>
      <Label>TV</Label>
    </Radio>
    <Radio disabled name="one" value='netflix'>
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
</FormGroup>
```

#### Radio input validation

```jsx
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;
const FormMeta = require('./meta').default;
const Label = require('./label').default;

<div>
  <FormGroup name='who-killed'>
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio name="two" success value='video'><Label>Video</Label></Radio>
      <Radio name="two" success checked value='tv'>TV</Radio>
      <Radio name="two" success value='netflix'>Netflix</Radio>
    </RadioList>
    <FormMeta left success>
      You are the best !
    </FormMeta>
  </FormGroup>
  <FormGroup name='who-killed'>
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio name="three" warning checked value='video'><Label>Video</Label></Radio>
      <Radio name="three" warning value='tv'>TV</Radio>
      <Radio name="three" warning value='netflix'>Netflix</Radio>
    </RadioList>
    <FormMeta left warning>
      Are you sure ?
    </FormMeta>
  </FormGroup>
  <FormGroup name='who-killed'>
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio name="four" error value='video'><Label>Video</Label></Radio>
      <Radio name="four" error value='tv'>TV</Radio>
      <Radio name="four" error value='netflix'>Netflix</Radio>
    </RadioList>
    <FormMeta error left>
      You need to select one
    </FormMeta>
  </FormGroup>
  <Legend>You can also have validation in each radio button</Legend>
  <FormGroup name='who-killed'>
    <Legend>Who killed the radio star?</Legend>
    <RadioList>
      <Radio success name="five" value='video'>
        <Label>Video</Label>
      </Radio>
      <FormMeta left success>
        You are the best !
      </FormMeta>
      <Radio warning name="five" value='tv'>
        <Label>TV</Label>
      </Radio>
        <FormMeta left warning>
          Are you sure ?
        </FormMeta>
      <Radio error name="five" value='netflix'>
        <Label>Netflix</Label>
      </Radio>
        <FormMeta left error>
          No, sorry
        </FormMeta>
    </RadioList>
  </FormGroup>
</div>
```