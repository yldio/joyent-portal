
####  Checkbox > Default
```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { FormLabel } = require('./');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Label name</FormLabel>
  <Checkbox>
      <Label>Detailed explanations</Label>
  </Checkbox>
  <Checkbox>
      <Label>Tips and tricks</Label>
  </Checkbox>
  <Checkbox>
      <Label>Hints</Label>
  </Checkbox>
</FormGroup>
```

####  Checkbox > Active/Focused
```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { FormLabel } = require('./');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Label name</FormLabel>
  <Checkbox checked>
      <Label>Detailed explanations</Label>
  </Checkbox>
  <Checkbox checked>
      <Label>Tips and tricks</Label>
  </Checkbox>
  <Checkbox>
      <Label>Hints</Label>
  </Checkbox>
</FormGroup>
```
####  Checkbox > Disabled
```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { FormLabel } = require('./');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Label name</FormLabel>
  <Checkbox disabled>
      <Label>Detailed explanations</Label>
  </Checkbox>
  <Checkbox disabled>
      <Label>Tips and tricks</Label>
  </Checkbox>
  <Checkbox disabled>
      <Label>Hints</Label>
  </Checkbox>
</FormGroup>
```

#### Checkbox > Error

```jsx
const React = require('react');
const { default: FormMeta } = require('./meta');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { FormLabel } = require('./');

<FormGroup name="test">
  <FormLabel style={{marginBottom: '12px'}}>Label name</FormLabel>
  <Checkbox error checked>
      <Label>Detailed explanations</Label>
  </Checkbox>
  <Checkbox checked>
      <Label>Tips and tricks</Label>
  </Checkbox>
  <Checkbox>
      <Label>Hints</Label>
  </Checkbox>
  <FormMeta error>
    Something’s missing
  </FormMeta>
</FormGroup>
```
