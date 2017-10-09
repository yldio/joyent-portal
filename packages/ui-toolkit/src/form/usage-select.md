```
<Select>
  <option selected disabled>Select a datacenter</option>
  <option>Amsterdam, EU</option>
  <option>San Francisco, USA</option>
  <option>Seoul, South Korea</option>
  <option>Tokyo, Japan</option>
</Select>
```

#### `disabled`

```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label>Your location</Label>
  <Select disabled>
    <option selected disabled>Select Location</option>
    <option value='1'>Amsterdam, EU</option>
    <option>San Francisco, USA</option>
    <option>Seoul, South Korea</option>
    <option>Tokyo, Japan</option>
  </Select>
</FormGroup>
```


#### warning

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<div>
  <FormGroup>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta warning='Unexpected inline warning!' />
  </FormGroup>
  <FormGroup warning='Unexpected group warning!'>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta />
  </FormGroup>
  <FormGroup meta={{warning: 'Unexpected meta warning!'}}>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta />
  </FormGroup>
  <FormGroup>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta warning>
      Unexpected children warning!
    </FormMeta>
  </FormGroup>
</div>
```

#### error

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<div>
  <FormGroup>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta error='Unexpected inline error!' />
  </FormGroup>
  <FormGroup error='Unexpected group error!'>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta />
  </FormGroup>
  <FormGroup meta={{error: 'Unexpected meta error!'}}>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta />
  </FormGroup>
  <FormGroup>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta error>
      Unexpected children error!
    </FormMeta>
  </FormGroup>
</div>
```

#### success

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<div>
  <FormGroup>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta success='Unexpected inline success!' />
  </FormGroup>
  <FormGroup success='Unexpected group success!'>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta />
  </FormGroup>
  <FormGroup meta={{success: 'Unexpected meta success!'}}>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta />
  </FormGroup>
  <FormGroup>
    <Label>Your location</Label>
    <Select>
      <option>Amsterdam, EU</option>
      <option>San Francisco, USA</option>
      <option>Seoul, South Korea</option>
      <option>Tokyo, Japan</option>
    </Select>
    <FormMeta success>
      Unexpected children success!
    </FormMeta>
  </FormGroup>
</div>
```

#### meta

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label>Your location</Label>
  <Select>
    <option>Amsterdam, EU</option>
    <option>San Francisco, USA</option>
    <option>Seoul, South Korea</option>
    <option>Tokyo, Japan</option>
  </Select>
  <FormMeta>
    I&#39;m a children of meta!
  </FormMeta>
</FormGroup>
```
