```jsx
<Select>
  <option selected disabled>
    Select a datacenter
  </option>
  <option>Amsterdam, EU</option>
  <option>San Francisco, USA</option>
  <option>Seoul, South Korea</option>
  <option>Tokyo, Japan</option>
</Select>;
```

#### Select > Disabled

```jsx
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label disabled>Your location</Label>
  <Select disabled>
    <option selected disabled>
      Select Location
    </option>
    <option value="1">Amsterdam, EU</option>
    <option>San Francisco, USA</option>
    <option>Seoul, South Korea</option>
    <option>Tokyo, Japan</option>
  </Select>
</FormGroup>;
```

#### Select > Warning

```jsx
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
  <FormMeta warning>Unexpected children warning!</FormMeta>
</FormGroup>;
```

#### Select > Error

```jsx
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
  <FormMeta error>Unexpected children error!</FormMeta>
</FormGroup>;
```

#### Select > Success

```jsx
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
  <FormMeta success>Unexpected children success!</FormMeta>
</FormGroup>;
```
