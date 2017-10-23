#### Success/Educational

```jsx
const { Message, MessageTitle, MessageDescription } = require('.');

<Message>
  <MessageTitle>Choosing deployment data center</MessageTitle>
  <MessageDescription>
    Not all data centres have all configurations of instances available. Make
    sure that you choose the data center that suits your requirements. Learn
    more
  </MessageDescription>
</Message>;
```

#### Error

```jsx
const { Message, MessageTitle, MessageDescription } = require('.');

<Message error>
  <MessageTitle>Choosing deployment data center</MessageTitle>
  <MessageDescription>Oh no</MessageDescription>
</Message>;
```

#### Warning

```jsx
const { Message, MessageTitle, MessageDescription } = require('.');

<Message warning>
  <MessageTitle>Choosing deployment data center</MessageTitle>
  <MessageDescription>There were some issues</MessageDescription>
</Message>;
```
