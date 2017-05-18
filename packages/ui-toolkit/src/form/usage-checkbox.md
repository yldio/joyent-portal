```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Checkbox />
  <Label>Check this out!</Label>
</FormGroup>
```

#### `checked`

```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Checkbox checked />
  <Label>Check this out!</Label>
</FormGroup>
```

#### `disabled`

```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Checkbox disabled />
  <Label>Check this out!</Label>
</FormGroup>
```

#### label before

```
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label>Check this out!</Label>
  <Checkbox />
</FormGroup>
```

#### warning

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<div>
  <FormGroup meta={{warning: 'Unexpected meta warning!'}}>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left />
  </FormGroup>
  <FormGroup warning='Unexpected group warning!'>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left />
  </FormGroup>
  <FormGroup>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left warning>
      Unexpected children warning!
    </FormMeta>
  </FormGroup>
  <FormGroup>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left warning='Unexpected inline warning!' />
  </FormGroup>
</div>
```

#### error

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<div>
  <FormGroup meta={{error: 'Unexpected meta error!'}}>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left />
  </FormGroup>
  <FormGroup error='Unexpected group error!'>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left />
  </FormGroup>
  <FormGroup>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left error>
      Unexpected children error!
    </FormMeta>
  </FormGroup>
  <FormGroup>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left error='Unexpected inline error!' />
  </FormGroup>
</div>
```

#### success

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<div>
  <FormGroup meta={{success: 'Unexpected meta success!'}}>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left />
  </FormGroup>
  <FormGroup success='Unexpected group success!'>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left />
  </FormGroup>
  <FormGroup>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left success>
      Unexpected children success!
    </FormMeta>
  </FormGroup>
  <FormGroup>
    <Checkbox />
    <Label>Check this out!</Label>
    <FormMeta left success='Unexpected inline success!' />
  </FormGroup>
</div>
```

#### label before with status

```
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<FormGroup>
  <Label>Check this out!</Label>
  <Checkbox />
  <FormMeta success left>
    Thanks for ticking, you are a star!
  </FormMeta>
</FormGroup>
```

#### multiple with meta

```
const { Col, Row } = require('react-styled-flexboxgrid');
const FormMeta = require('./meta').default;
const FormGroup = require('./group').default;
const Label = require('./label').default;

<Row>
  <Col md={6}>
    <FormGroup>
      <Row>
        <Col>
          <Label>Check this out!</Label>
          <Checkbox />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormMeta success left>
            Thanks for ticking, you are a star!
          </FormMeta>
        </Col>
      </Row>
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Row>
        <Col>
          <FormMeta success left>
            Thanks for ticking, you are a star!
          </FormMeta>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Check this out!</Label>
          <Checkbox />
        </Col>
      </Row>
    </FormGroup>
  </Col>
</Row>
```
