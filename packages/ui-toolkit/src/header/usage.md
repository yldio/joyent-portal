```
const React = require('react');
const { default: HeaderBrand } = require('./brand.js');
const { default: HeaderItem } = require('./item.js');
const { default: HeaderNav, HeaderAnchor } = require('./nav.js');

<Header>
  <HeaderBrand beta><TritonBetaIcon/></HeaderBrand>
  <HeaderNav>
    <li><HeaderAnchor href="#">Compute</HeaderAnchor></li>
    <li><HeaderAnchor href="#" class="active">Network</HeaderAnchor></li>
  </HeaderNav>
  <HeaderItem>Return to existing portal</HeaderItem>
  <HeaderItem><DataCenterIconLight/>eu-east-1</HeaderItem>
  <HeaderItem><UserIconLight/>Nicola</HeaderItem>
</Header>
```
