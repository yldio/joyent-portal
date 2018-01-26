These icons are used to denote separate sections within the Instance Management space of Triton Compute.

```js noeditor
const React = require('react');
const { List, Icon, ListItem } = require('./icons');
const { default: Label } = require('../label');
const { default: theme } = require('../theme');

const {
  Actions,
  Affinity,
  Arrow,
  Bin,
  Clipboard,
  Close,
  Cns,
  Copy,
  DataCenter,
  Delete,
  Dot,
  Duplicate,
  Edit,
  Firewall,
  Id,
  Import,
  InstanceCount,
  InstanceType,
  Instances,
  Loading,
  Login,
  Metadata,
  Minus,
  Network,
  Package,
  Plus,
  Reset,
  Start,
  Stop,
  Tags,
  Triton,
  User
} = require('.');

<List>
  <ListItem>
    <Icon>
      <Affinity />
    </Icon>
    <Label>Affinity</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Firewall />
    </Icon>
    <Label>Firewall</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Cns />
    </Icon>
    <Label>CNS/DNS</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <InstanceCount />
    </Icon>
    <Label>InstanceCount</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <InstanceType />
    </Icon>
    <Label>InstanceType</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Metadata />
    </Icon>
    <Label>Metadata</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Package />
    </Icon>
    <Label>Package</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Network />
    </Icon>
    <Label>Network</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Tags />
    </Icon>
    <Label>Tags</Label>
  </ListItem>
</List>;
```
