### Text Entry

```jsx
// Name: Active
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Input } = require('./input');

<FormGroup>
  <Label>Username</Label>
  <Input placeholder="Example: JarJarBinks" type="text" />
</FormGroup>;

// Tab: Disabled
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Input } = require('./input');

<FormGroup>
  <Label disabled>Username</Label>
  <Input disabled placeholder="Example: JarJarBinks" type="text" />
</FormGroup>;

// Tab: Error
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: FormMeta } = require('./meta');
const { default: Input } = require('./input');

<FormGroup>
  <Label>Username</Label>
  <Input value="anton/s" error type="text" />
  <FormMeta error>Something’s wrong</FormMeta>
</FormGroup>;
```
