#### Page Message

```jsx
const React = require('react');
const { Message, Title, Description } = require('.');

<div>
  <Message onCloseClick={() => null}>
    <Title>Choosing deployment data center</Title>
    <Description>
      Not all data centres have all configurations of instances available. Make
      sure that you choose the data center that suits your requirements. Learn
      more
    </Description>
  </Message>
  <br />
  <Message onCloseClick={() => null} warning>
    <Title>Choosing deployment data center</Title>
    <Description>
      Not all data centres have all configurations of instances available. Make
      sure that you choose the data center that suits your requirements. Learn
      more
    </Description>
  </Message>
  <br />
  <Message onCloseClick={() => null} error>
    <Title>Choosing deployment data center</Title>
    <Description>
      Not all data centres have all configurations of instances available. Make
      sure that you choose the data center that suits your requirements. Learn
      more
    </Description>
  </Message>
</div>;
```
