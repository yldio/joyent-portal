```
const { ToggleList } = require('./toggle');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed-1'>
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value='video' checked>Video</Toggle>
    <Toggle value='tv'>TV</Toggle>
  </ToggleList>
</FormGroup>
```

#### Toggle > Disabled

```
const { ToggleList } = require('./toggle');
const FormGroup = require('./group').default;
const Legend = require('./legend').default;

<FormGroup name='who-killed-2' disabled>
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value='video'>Video</Toggle>
    <Toggle value='tv'>TV</Toggle>
  </ToggleList>
</FormGroup>
```
