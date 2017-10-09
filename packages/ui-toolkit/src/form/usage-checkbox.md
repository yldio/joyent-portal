```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
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
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

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
