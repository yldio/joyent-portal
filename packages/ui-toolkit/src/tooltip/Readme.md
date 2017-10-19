```jsx
const { default: Tooltip, Container, Target } = require('./');
const { Row, Col } = require('react-styled-flexboxgrid');

<Row center="xs" between="xs">
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="top">
        <code>top</code>
      </Tooltip>
    </Container>
  </Col>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="right">
        <code>right</code>
      </Tooltip>
    </Container>
  </Col>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="bottom">
        <code>bottom</code>
      </Tooltip>
    </Container>
  </Col>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Tooltip placement="left">
        <code>left</code>
      </Tooltip>
    </Container>
  </Col>
</Row>;
```

#### Tooltip > hover

```jsx
const { default: Tooltip, Container, Target } = require('./');
const { Row, Col } = require('react-styled-flexboxgrid');

<Row center="xs" between="xs">
  <Col xs={2}>
    <Container hoverable>
      <Target>Hover here</Target>
      <Tooltip placement="top">
        <code>top</code>
      </Tooltip>
    </Container>
  </Col>
</Row>;
```

#### Tooltip > click

```jsx
const { default: Tooltip, Container, Target } = require('./');
const { Row, Col } = require('react-styled-flexboxgrid');

<Row center="xs" between="xs">
  <Col xs={2}>
    <Container clickable>
      <Target>Click here</Target>
      <Tooltip placement="top">
        <code>top</code>
      </Tooltip>
    </Container>
  </Col>
</Row>;
```
