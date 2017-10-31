```
const React = require('react');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');

<FormGroup name="test">
  <Checkbox checked>
      <Label>Detailed explanations</Label>
  </Checkbox>
  <Checkbox checked>
      <Label>Tips and tricks</Label>
  </Checkbox>
  <Checkbox>
      <Label>Hints</Label>
  </Checkbox>
  <Checkbox disabled>
      <Label>How to</Label>
  </Checkbox>
</FormGroup>
```

#### Checkbox input validation

```
const React = require('react');
const { default: FormMeta } = require('./meta');
const { default: FormGroup } = require('./group');
const { default: Label } = require('./label');

<div>
  <FormGroup>
    <Checkbox checked success>
      <Label>Check this out!</Label>
      <FormMeta left success>
        Everything looks great
      </FormMeta>
    </Checkbox>
  </FormGroup>
  <FormGroup>
    <Checkbox checked warning>
      <Label>Check this out!</Label>
    <FormMeta left warning>
     Are you sure ?
    </FormMeta>
    </Checkbox>
  </FormGroup>
  <FormGroup>
    <Checkbox error checked>
      <Label>Check this out!</Label>
    <FormMeta left error>
      Something’s missing
    </FormMeta>
    </Checkbox>
  </FormGroup>
</div>
```
