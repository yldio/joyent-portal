#### Input > Email

```jsx
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label>Username</Label>
  <Input placeholder="Example: JarJarBinks" type="email" />
</FormGroup>;
```

#### Input > Disabled

```jsx
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label disabled>Username</Label>
  <Input disabled placeholder="Example: JarJarBinks" type="email" />
</FormGroup>;
```

#### Input > Error

```jsx
const FormGroup = require('./group').default;
const Label = require('./label').default;
const FormMeta = require('./meta').default;

<FormGroup>
  <Label>Email Address</Label>
  <Input placeholder="Enter email" type="email" />
  <FormMeta error>Unexpected children error!</FormMeta>
</FormGroup>;
```

#### Input > Warning

```jsx
const FormGroup = require('./group').default;
const Label = require('./label').default;
const FormMeta = require('./meta').default;

<FormGroup>
  <Label>Email Address</Label>
  <Input placeholder="Enter email" type="email" />
  <FormMeta warning>Unexpected children warning!</FormMeta>
</FormGroup>;
```

#### Input > Success

```jsx
const FormGroup = require('./group').default;
const Label = require('./label').default;
const FormMeta = require('./meta').default;

<FormGroup>
  <Label>Email Address</Label>
  <Input placeholder="Enter email" type="email" />
  <FormMeta success>Unexpected children success!</FormMeta>
</FormGroup>;
```
