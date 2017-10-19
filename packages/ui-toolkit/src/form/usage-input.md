#### Input > Email

```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Input } = require('./input');

<FormGroup>
  <Label>Username</Label>
  <Input placeholder="Example: JarJarBinks" type="email" />
</FormGroup>;
```

#### Input > Disabled

```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Input } = require('./input');

<FormGroup>
  <Label disabled>Username</Label>
  <Input disabled placeholder="Example: JarJarBinks" type="email" />
</FormGroup>;
```

#### Input > Error

```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: FormMeta } = require('./meta');
const { default: Input } = require('./input');

<FormGroup>
  <Label>Email Address</Label>
  <Input placeholder="Enter email" type="email" />
  <FormMeta error>Unexpected children error!</FormMeta>
</FormGroup>;
```

#### Input > Warning

```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: FormMeta } = require('./meta');
const { default: Input } = require('./input');

<FormGroup>
  <Label>Email Address</Label>
  <Input placeholder="Enter email" type="email" />
  <FormMeta warning>Unexpected children warning!</FormMeta>
</FormGroup>;
```

#### Input > Success

```jsx
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: FormMeta } = require('./meta');
const { default: Input } = require('./input');

<FormGroup>
  <Label>Email Address</Label>
  <Input placeholder="Enter email" type="email" />
  <FormMeta success>Unexpected children success!</FormMeta>
</FormGroup>;
```
