```jsx
const React = require('react');
const { default: Popover, Container, Target, Item, Divider } = require('./');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');

<Row center="xs" between="xs" style={{ marginTop: 80 }}>
  <Col xs={2}>
    <Container>
      <Target>Hello</Target>
      <Popover placement="right">
        <Item>Scale</Item>
        <Item>Restart</Item>
        <Item>Stop</Item>
        <Divider />
        <Item>Delete</Item>
      </Popover>
    </Container>
  </Col>
</Row>;
```
