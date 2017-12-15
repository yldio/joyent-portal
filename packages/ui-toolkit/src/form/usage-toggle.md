```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Toggle } = require('./toggle');

<FormGroup name="who-killed-1">
  <Toggle value="video">Video</Toggle>
</FormGroup>;
```

#### Toggle > Disabled

```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Toggle } = require('./toggle');

<FormGroup name="who-killed-2" disabled>
  <Toggle value="video" disabled>
    Video
  </Toggle>
</FormGroup>;
```
