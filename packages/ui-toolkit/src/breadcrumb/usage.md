```jsx
// Name: Active
const React = require('react');
const { default: Anchor } = require('../anchor/index.js');
const { default: Breadcrumb } = require('./index.js');
const { default: BreadcrumbItem } = require('./item.js');

<Breadcrumb>
  <BreadcrumbItem>Home</BreadcrumbItem>
  <BreadcrumbItem>
    <Anchor href="https://joyent.com">Warp Records Blog</Anchor>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <Anchor href="https://joyent.com">Services</Anchor>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <Anchor href="https://joyent.com">Ngnix</Anchor>
  </BreadcrumbItem>
</Breadcrumb>;
```
