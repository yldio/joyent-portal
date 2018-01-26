#### Success/Educational

```jsx
const React = require('react');
const { Message, Title, Description } = require('.');

<Message onCloseClick={() => null}>
  <Title>Choosing deployment data center</Title>
  <Description>
    Not all data centres have all configurations of instances available. Make
    sure that you choose the data center that suits your requirements. Learn
    more
  </Description>
</Message>;
```

#### Error

```jsx
const React = require('react');
const { Message, Title, Description } = require('.');

<Message onCloseClick={() => null} error>
  <Title>Choosing deployment data center</Title>
  <Description>Oh no</Description>
</Message>;
```

#### Warning

```jsx
const React = require('react');
const { Message, Title, Description } = require('.');

<Message onCloseClick={() => null} warning>
  <Title>Choosing deployment data center</Title>
  <Description>There were some issues</Description>
</Message>;
```
