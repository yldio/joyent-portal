### Quick Action Toast

Quick Action Toasts are used to show contextually relevent commands and actions and should stick to the bottom of the page when they are active.

```jsx
// Name: Active
const React = require('react');
const {
  StickyFooter,
  StartIcon,
  Button,
  StopIcon,
  ResetIcon,
  DeleteIcon
} = require('../');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');

<div style={{ position: 'relative', height: 100 }}>
  <StickyFooter bottom>
    <Row between="xs" middle="xs">
      <Col xs={7}>
        <Button type="button" secondary>
          <StartIcon />
          <span>Start</span>
        </Button>
        <Button type="button" secondary>
          <StopIcon />
          <span>Stop</span>
        </Button>
        <Button type="button" secondary>
          <ResetIcon />
          <span>Reboot</span>
        </Button>
      </Col>
      <Col xs={5}>
        <Button type="button" error secondary right>
          <DeleteIcon fill="#D2433A" />
          <span>Remove</span>
        </Button>
      </Col>
    </Row>
  </StickyFooter>
</div>;
```
