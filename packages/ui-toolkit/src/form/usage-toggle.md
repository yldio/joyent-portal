```
const { ToggleList } = require('./toggle');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed'>
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value='video'>Video</Toggle>
    <Toggle value='tv'>TV</Toggle>
  </ToggleList>
</FormGroup>
```

#### selected

```
const { ToggleList } = require('./toggle');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed'>
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value='video' checked>Video</Toggle>
    <Toggle value='tv'>TV</Toggle>
  </ToggleList>
</FormGroup>
```

#### `disabled`

```
const { ToggleList } = require('./toggle');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed' disabled>
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value='video'>Video</Toggle>
    <Toggle value='tv'>TV</Toggle>
  </ToggleList>
</FormGroup>
```
