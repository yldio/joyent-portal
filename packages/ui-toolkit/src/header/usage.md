```
const HeaderBrand = require('./brand.js').default;
const HeaderItem = require('./item.js').default;
const HeaderNav = require('./nav.js').default;
const HeaderWrapper = require('./header-wrapper.js').default;
const { UserIconLight, DataCenterIconLight, TritonBetaIcon } = require('../icons');

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
