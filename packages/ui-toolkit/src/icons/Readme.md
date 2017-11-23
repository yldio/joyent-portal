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
  User
} = require('.');

<List>
  <ListItem>
    <Icon>
      <Actions />
    </Icon>
    <Label>Actions &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Actions light />
    </Icon>
    <Label>Actions &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Actions disabled />
    </Icon>
    <Label>Actions &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Affinity />
    </Icon>
    <Label>Affinity &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Affinity light />
    </Icon>
    <Label>Affinity &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Affinity disabled />
    </Icon>
    <Label>Affinity &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow />
    </Icon>
    <Label>Arrow &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow direction="right" />
    </Icon>
    <Label>Arrow &gt; Right</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow direction="up" />
    </Icon>
    <Label>Arrow &gt; Up</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow direction="left" />
    </Icon>
    <Label>Arrow &gt; left</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Arrow light />
    </Icon>
    <Label>Arrow &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Arrow disabled />
    </Icon>
    <Label>Arrow &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Bin />
    </Icon>
    <Label>Bin &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark >
      <Bin light />
    </Icon>
    <Label>Bin &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Bin disabled />
    </Icon>
    <Label>Bin &gt; Disabled</Label>
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
    <Label>Clipboard &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Clipboard light />
    </Icon>
    <Label>Clipboard &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Clipboard disabled />
    </Icon>
    <Label>Clipboard &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Cns />
    </Icon>
    <Label>CNS &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Cns light />
    </Icon>
    <Label>CNS &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Cns disabled />
    </Icon>
    <Label>CNS &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <DataCenter />
    </Icon>
    <Label>Data Centre &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <DataCenter light />
    </Icon>
    <Label>Data Centre &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <DataCenter disabled />
    </Icon>
    <Label>Data Centre &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Delete fill={theme.red} />
    </Icon>
    <Label>Delete &gt; Red</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Delete light />
    </Icon>
    <Label>Delete &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Delete />
    </Icon>
    <Label>Delete &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Delete disabled />
    </Icon>
    <Label>Delete &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Dot color='primary' />
    </Icon>
    <Label>Dot &gt; Primary</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Duplicate />
    </Icon>
    <Label>Duplicate &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Duplicate light />
    </Icon>
    <Label>Duplicate &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Duplicate disabled />
    </Icon>
    <Label>Duplicate &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Edit />
    </Icon>
    <Label>Edit &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Edit light />
    </Icon>
    <Label>Edit &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Edit disabled />
    </Icon>
    <Label>Edit &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Firewall />
    </Icon>
    <Label>Firewall &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Firewall light />
    </Icon>
    <Label>Firewall &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Firewall disabled />
    </Icon>
    <Label>Firewall &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Health />
    </Icon>
    <Label>Health &gt; Healthy</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Health healthy={false} />
    </Icon>
    <Label>Health &gt; Unhealthy</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Id />
    </Icon>
    <Label>Id &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Id light />
    </Icon>
    <Label>Id &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Id disabled />
    </Icon>
    <Label>Id &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Import />
    </Icon>
    <Label>Import</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <InstanceCount />
    </Icon>
    <Label>InstanceCount &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <InstanceCount light />
    </Icon>
    <Label>InstanceCount &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <InstanceCount disabled />
    </Icon>
    <Label>InstanceCount &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <InstanceType />
    </Icon>
    <Label>InstanceType &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <InstanceType light />
    </Icon>
    <Label>InstanceType &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <InstanceType disabled />
    </Icon>
    <Label>InstanceType &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Instances />
    </Icon>
    <Label>Instances &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Instances light />
    </Icon>
    <Label>Instances &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Instances disabled />
    </Icon>
    <Label>Instances &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Loading />
    </Icon>
    <Label>Loading &gt; Primary</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Loading secondary />
    </Icon>
    <Label>Loading &gt; Secondary</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Loading light />
    </Icon>
    <Label>Loading &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Loading disabled />
    </Icon>
    <Label>Loading &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Login />
    </Icon>
    <Label>Login &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Login light />
    </Icon>
    <Label>Login &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Login disabled />
    </Icon>
    <Label>Login &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Metadata />
    </Icon>
    <Label>Metadata &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Metadata light />
    </Icon>
    <Label>Metadata &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Metadata disabled />
    </Icon>
    <Label>Metadata &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Minus />
    </Icon>
    <Label>Minus &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Minus light />
    </Icon>
    <Label>Minus &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Minus disabled />
    </Icon>
    <Label>Minus &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Network />
    </Icon>
    <Label>Network &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Network light />
    </Icon>
    <Label>Network &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Network disabled />
    </Icon>
    <Label>Network &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Package />
    </Icon>
    <Label>Package &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Package light />
    </Icon>
    <Label>Package &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Package disabled />
    </Icon>
    <Label>Package &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Plus />
    </Icon>
    <Label>Plus &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Plus light />
    </Icon>
    <Label>Plus &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Plus disabled />
    </Icon>
    <Label>Plus &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Reset />
    </Icon>
    <Label>Reset &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Reset light />
    </Icon>
    <Label>Reset &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Reset disabled />
    </Icon>
    <Label>Reset &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Start />
    </Icon>
    <Label>Start &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Start light />
    </Icon>
    <Label>Start &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Start disabled />
    </Icon>
    <Label>Start &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Stop />
    </Icon>
    <Label>Stop &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Stop light />
    </Icon>
    <Label>Stop &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Stop disabled />
    </Icon>
    <Label>Stop &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Tags />
    </Icon>
    <Label>Tags &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Tags light />
    </Icon>
    <Label>Tags &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Tags disabled />
    </Icon>
    <Label>Tags &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Triton />
    </Icon>
    <Label>Triton &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Triton light />
    </Icon>
    <Label>Triton &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Triton disabled />
    </Icon>
    <Label>Triton &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Triton beta />
    </Icon>
    <Label>Triton Beta &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <Triton beta light />
    </Icon>
    <Label>Triton Beta &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <Triton beta disabled />
    </Icon>
    <Label>Triton Beta &gt; Disabled</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <User />
    </Icon>
    <Label>User &gt; Dark</Label>
  </ListItem>
  <ListItem>
    <Icon dark>
      <User light />
    </Icon>
    <Label>User &gt; Light</Label>
  </ListItem>
  <ListItem>
    <Icon>
      <User disabled />
    </Icon>
    <Label>User &gt; Disabled</Label>
  </ListItem>
</List>;
```
