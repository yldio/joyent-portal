```jsx
const React = require('react');
const { default: SectionListItem, Anchor } = require('./item');
const { default: SectionList } = require('./');

<SectionList>
  <SectionListItem>
    <Anchor active>Overview</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Services</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Instances</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Versions</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Manifest</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Settings</Anchor>
  </SectionListItem>
</SectionList>;
```
