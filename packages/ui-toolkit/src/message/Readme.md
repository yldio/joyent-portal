#### Success/Educational

```
const { Title, Description } = require('.');

<Message>
  <Title>Choosing deployment data center</Title>
  <Description>Not all data centres have all configurations of instances available. Make sure that you choose the data center that suits your requirements. Learn more</Description>
</Message>
```

#### Error

```
const { Title, Description } = require('.');

<Message error>
  <Title>Choosing deployment data center</Title>
  <Description>Oh no</Description>
</Message>
```

#### Warning

```
const { Title, Description } = require('.');

<Message warning>
  <Title>Choosing deployment data center</Title>
  <Description>There were some issues</Description>
</Message>
```
