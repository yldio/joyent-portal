```jsx
const React = require('react');
const { ToggleList } = require('./toggle');
const { default: FormGroup } = require('./group');
const { default: Legend } = require('./legend');
const { default: Toggle } = require('./toggle');

<FormGroup name="who-killed-1">
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value="video" checked>
      Video
    </Toggle>
    <Toggle value="tv">TV</Toggle>
  </ToggleList>
</FormGroup>;
```

#### Toggle > Disabled

```jsx
const React = require('react');
const { ToggleList } = require('./toggle');
const { default: FormGroup } = require('./group');
const { default: Legend } = require('./legend');
const { default: Toggle } = require('./toggle');

<FormGroup name="who-killed-2" disabled>
  <Legend>Who killed the radio star?</Legend>
  <ToggleList>
    <Toggle value="video">Video</Toggle>
    <Toggle value="tv">TV</Toggle>
  </ToggleList>
</FormGroup>;
```
