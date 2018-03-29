```jsx
const React = require('react');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');
const { default: Tooltip, Container, Target } = require('./');
const { P } = require('../text');

<Row center="xs" between="xs" style={{ marginTop: 60 }}>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="top">
        <P white>top</P>
      </Tooltip>
    </Container>
  </Col>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="right">
        <P white>right</P>
      </Tooltip>
    </Container>
  </Col>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="bottom">
        <P white>bottom</P>
      </Tooltip>
    </Container>
  </Col>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="left">
        <P white>left</P>
      </Tooltip>
    </Container>
  </Col>
</Row>;
```

### Tooltip > hover

```jsx
const React = require('react');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');
const { default: Tooltip, Container, Target } = require('./');
const { P } = require('../text');

<Row center="xs" between="xs">
  <Col xs={3}>
    <Container hoverable>
      <Target>Hover here</Target>
      <Tooltip placement="top">
        <P white>top</P>
      </Tooltip>
    </Container>
  </Col>
</Row>;
```

### Tooltip > click

```jsx
const React = require('react');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');
const { default: Tooltip, Container, Target } = require('./');
const { P } = require('../text');

<Row center="xs" between="xs">
  <Col xs={2}>
    <Container clickable>
      <Target>Click here</Target>
      <Tooltip placement="top">
        <P white>top</P>
      </Tooltip>
    </Container>
  </Col>
</Row>;
```
