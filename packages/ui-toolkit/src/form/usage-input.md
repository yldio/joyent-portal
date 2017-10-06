#### `type`

```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label>Username</Label>
  <Input placeholder='Example: JarJarBinks' type='email' />
</FormGroup>
```

#### error

```
const FormGroup = require('./group').default;
const Label = require('./label').default;
const FormMeta = require('./meta').default;

<div>
  <FormGroup>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta error='Unexpected inline error!' />
  </FormGroup>
  <FormGroup error='Unexpected group error!'>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta />
  </FormGroup>
  <FormGroup meta={{error: 'Unexpected meta error!'}}>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta />
  </FormGroup>
  <FormGroup>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta error>
      Unexpected children error!
    </FormMeta>
  </FormGroup>
</div>
```

#### warning

```
const FormGroup = require('./group').default;
const Label = require('./label').default;
const FormMeta = require('./meta').default;

<div>
  <FormGroup>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta warning='Unexpected inline warning!' />
  </FormGroup>
  <FormGroup warning='Unexpected group warning!'>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta />
  </FormGroup>
  <FormGroup meta={{warning: 'Unexpected meta warning!'}}>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta />
  </FormGroup>
  <FormGroup>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta warning>
      Unexpected children warning!
    </FormMeta>
  </FormGroup>
</div>
```

#### success

```
const FormGroup = require('./group').default;
const Label = require('./label').default;
const FormMeta = require('./meta').default;

<div>
  <FormGroup>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta success='Unexpected inline success!' />
  </FormGroup>
  <FormGroup success='Unexpected group success!'>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta />
  </FormGroup>
  <FormGroup meta={{success: 'Unexpected meta success!'}}>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta />
  </FormGroup>
  <FormGroup>
    <Label>Email Address</Label>
    <Input placeholder='Enter email' type='email' />
    <FormMeta success>
      Unexpected children success!
    </FormMeta>
  </FormGroup>
</div>
```