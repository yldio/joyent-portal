```jsx
const React = require('react');
const { default: HeaderBrand } = require('./brand.js');
const { default: HeaderItem } = require('./item.js');
const { Anchor: HeaderAnchor } = require('./item.js');
const { default: HeaderNav } = require('./nav.js');
const { Triton, DataCenter, User } = require('../icons');
const { default: Header } = require('./index');

<Header>
  <HeaderBrand beta center>
    <Triton light />
  </HeaderBrand>
  <HeaderNav>
    <li>
      <HeaderAnchor>Compute</HeaderAnchor>
    </li>
  </HeaderNav>
  <HeaderItem>Return to existing portal</HeaderItem>
  <HeaderItem>
    <DataCenter light />eu-east-1
  </HeaderItem>
  <HeaderItem>
    <User light />Nicola
  </HeaderItem>
</Header>;
```
