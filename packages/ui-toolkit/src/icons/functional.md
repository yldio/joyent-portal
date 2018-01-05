These icons are used to support funtions and actions users can take within the Triton service.

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
  Checkcircle,
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
  Health,
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
  User,
  Name,
  Randomize,
  Fabric
} = require('.');

<List>
  <ListItem>
    <Icon>
      <Actions />
    </Icon>
    <Label>Actions</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow />
    </Icon>
    <Label>Arrow</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow direction="right" />
    </Icon>
    <Label>Arrow > Right</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow direction="up" />
    </Icon>
    <Label>Arrow > Up</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow direction="left" />
    </Icon>
    <Label>Arrow > left</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Bin />
    </Icon>
    <Label>Bin</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Checkcircle checked />
    </Icon>
    <Label>Tick</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Checkcircle checked fill />
    </Icon>
    <Label>Completed</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Checkcircle checked border />
    </Icon>
    <Label>Part Completed</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Checkcircle border />
    </Icon>
    <Label>Incomplete</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Close />
    </Icon>
    <Label>Close</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Clipboard />
    </Icon>
    <Label>Clipboard</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Copy />
    </Icon>
    <Label>Copy</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <DataCenter />
    </Icon>
    <Label>Data Center</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Delete fill={theme.red} />
    </Icon>
    <Label>Delete > Red</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Delete />
    </Icon>
    <Label>Delete</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Dot color='primary' />
    </Icon>
    <Label>Dot > Primary</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Duplicate />
    </Icon>
    <Label>Duplicate</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Edit />
    </Icon>
    <Label>Edit</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Fabric />
    </Icon>
    <Label>Fabric</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Health />
    </Icon>
    <Label>Health > Healthy</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Health healthy={false} />
    </Icon>
    <Label>Health > Unhealthy</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Id />
    </Icon>
    <Label>ID</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Import />
    </Icon>
    <Label>Import</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Instances />
    </Icon>
    <Label>Instances</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Loading />
    </Icon>
    <Label>Loading > Primary</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Loading secondary />
    </Icon>
    <Label>Loading > Secondary</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Login />
    </Icon>
    <Label>Login</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Minus />
    </Icon>
    <Label>Minus</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Name />
    </Icon>
    <Label>Name</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Plus />
    </Icon>
    <Label>Plus</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Randomize />
    </Icon>
    <Label>Randomize</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Reset />
    </Icon>
    <Label>Reset</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Start />
    </Icon>
    <Label>Start</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Stop />
    </Icon>
    <Label>Stop</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Triton />
    </Icon>
    <Label>Triton</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Triton beta />
    </Icon>
    <Label>Triton Beta</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <User />
    </Icon>
    <Label>User</Label>
  </ListItem>
</List>;
```

