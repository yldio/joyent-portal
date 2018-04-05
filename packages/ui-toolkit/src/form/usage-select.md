### Select

This is the standard dropdown menu to be used in forms and for multiple choice selections.

```jsx
// Name: Active
const React = require('react');
const { default: Select } = require('./select');
const { default: Label } = require('./label');
const { default: FormGroup } = require('./group');

<FormGroup>
  <Label>Your location</Label>
  <Select>
    <option selected disabled>
      Select a datacenter
    </option>
    <option>Amsterdam, EU</option>
    <option>San Francisco, USA</option>
    <option>Seoul, South Korea</option>
    <option>Tokyo, Japan</option>
  </Select>
</FormGroup>;

// Tab: Disabled
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

// Tab: Error
const React = require('react');
const { default: FormMeta } = require('./meta');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');
const { default: Flex } = require('styled-flex-component');
const { default: Select } = require('./select');

<FormGroup>
  <Flex alignCenter justifyBetween>
    <Label>Your location</Label>
    <FormMeta top error>
      Unexpected children error!
    </FormMeta>
  </Flex>
  <Select>
    <option>Amsterdam, EU</option>
    <option>San Francisco, USA</option>
    <option>Seoul, South Korea</option>
    <option>Tokyo, Japan</option>
  </Select>
</FormGroup>;
```
