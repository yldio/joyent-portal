```
const React = require('react');
const { default: HeaderBrand } = require('./brand.js');
const { default: HeaderItem } = require('./item.js');
const { default: HeaderNav, HeaderNavAnchor } = require('./nav.js');

<Header>
  <HeaderBrand beta><TritonBetaIcon/></HeaderBrand>
  <HeaderNav>
    <li><HeaderNavAnchor href="#">Compute</HeaderNavAnchor></li>
    <li><HeaderNavAnchor href="#" class="active">Network</HeaderNavAnchor></li>
  </HeaderNav>
  <HeaderItem>Return to existing portal</HeaderItem>
  <HeaderItem><DataCenterIconLight/>eu-east-1</HeaderItem>
  <HeaderItem><UserIconLight/>Nicola</HeaderItem>
</Header>
```
