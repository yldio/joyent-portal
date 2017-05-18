```
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Label = require('./label').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed'>
  <Legend>Who killed the radio star?</Legend>
  <RadioList>
    <Radio value='video' checked>
      <Label>Video</Label>
    </Radio>
    <Radio value='tv'>
      <Label>TV</Label>
    </Radio>
    <Radio value='netflix'>
      <Label>Netflix</Label>
    </Radio>
  </RadioList>
</FormGroup>
```

#### `disabled`

```
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed' disabled>
  <Legend>Who killed the radio star?</Legend>
  <RadioList>
    <Radio value='video'>Video</Radio>
    <Radio value='tv'>TV</Radio>
    <Radio value='netflix'>Netflix</Radio>
  </RadioList>
</FormGroup>
```

#### error

```
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;
const FormMeta = require('./meta').default;

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
  <FormGroup name='who-killed' meta={{error: 'Unexpected meta error!'}} margin-bottom='1'>
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
```

#### warning

```
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;
const FormMeta = require('./meta').default;

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
  <FormGroup name='who-killed' meta={{warning: 'Unexpected meta warning!'}}>
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
```

#### success

```
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;
const FormMeta = require('./meta').default;

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
  <FormGroup name='who-killed' meta={{success: 'Unexpected meta success!'}}>
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
```

#### meta before

```
const { RadioList } = require('./radio');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;
const FormMeta = require('./meta').default;

<FormGroup name='who-killed'>
  <Legend>Who killed the radio star?</Legend>
  <FormMeta left>I&#39;m a children of meta</FormMeta>
  <RadioList>
    <Radio value='video'>Video</Radio>
    <Radio value='tv'>TV</Radio>
    <Radio value='netflix'>Netflix</Radio>
  </RadioList>
</FormGroup>
```