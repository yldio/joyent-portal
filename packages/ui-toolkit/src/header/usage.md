```
const React = require('react');
const { default: HeaderBrand } = require('./brand.js');
const { default: HeaderItem } = require('./item.js');
const { default: HeaderNav } = require('./nav.js');
const { Triton, DataCenter, User } = require('../icons');

<Header>
  <HeaderBrand beta>
    <Triton />
  </HeaderBrand>
  <HeaderNav>
    <li>
      Compute
    </li>
  </HeaderNav>
  <HeaderItem>
    Return to existing portal
  </HeaderItem>
  <HeaderItem>
    <DataCenter light />eu-east-1
  </HeaderItem>
  <HeaderItem>
    <User light />Nicola
  </HeaderItem>
</Header>
```
