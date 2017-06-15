```
const Dropdown = require('./index').default;
const Label = require('../form/label').default;

<div style={{ position: 'relative', height: '175px' }}>
  <Label>Service</Label>
  <Dropdown placeholder="Choose" data={["Wordpress", "Nginx", "Percona"]}>
  </Dropdown>
</div>
```
