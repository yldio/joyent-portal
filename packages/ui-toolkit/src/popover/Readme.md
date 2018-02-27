```jsx
const React = require('react');
const { default: Popover, Container, Target, Item, Divider } = require('./');
const { Row } = require('joyent-react-styled-flexboxgrid');

<Row center="xs" between="xs" style={{ marginTop: 80 }}>
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
</Row>;
```
