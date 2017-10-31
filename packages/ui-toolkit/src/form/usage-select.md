```jsx
const React = require('react');
const { default: Select } = require('./select');

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
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Select } = require('./select');

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
const React = require('react');
const { default: FormMeta } = require('./meta');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Select } = require('./select');

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
const React = require('react');
const { default: FormMeta } = require('./meta');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Select } = require('./select');

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
const React = require('react');
const { default: FormMeta } = require('./meta');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Select } = require('./select');

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
