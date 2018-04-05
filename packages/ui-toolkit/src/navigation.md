### Breadcrumb

```jsx
// Name: Active
const React = require('react');
const { Breadcrumb, BreadcrumbItem, Anchor } = require('./index.js');

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

### Footer

```jsx
// Name: Active
const React = require('react');
const { Footer } = require('./');

<div style={{ position: 'relative', height: 100 }}>
  <Footer />
</div>;
```
