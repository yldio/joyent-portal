```
const React = require('react');
const { default: HeaderBrand } = require('./brand.js');
const { default: HeaderItem } = require('./item.js');

<Header>
  <HeaderWrapper>
    <HeaderBrand beta><TritonBetaIcon/></HeaderBrand>
    <HeaderNav>
      <li><a href="#">Compute</a></li>
      <li><a href="#" class="active">Network</a></li>
    </HeaderNav>
    <HeaderItem>Return to existing portal</HeaderItem>
    <HeaderItem><DataCenterIconLight/>eu-east-1</HeaderItem>
    <HeaderItem><UserIconLight/>Nicola</HeaderItem>
  </HeaderWrapper>
</Header>
```
