```jsx
const { default: Popover, Container, Target, Item, Divider } = require('./');
const { Row, Col } = require('react-styled-flexboxgrid');

<Row center="xs" between="xs">
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
