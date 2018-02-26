```jsx
// Name: Example
const React = require('react');
const { default: SectionListItem, Anchor } = require('./item');
const { default: SectionList } = require('./');

<SectionList>
  <SectionListItem>
    <Anchor active>Summary</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Package</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Tags</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Metadata</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>User Scripts</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Networks</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Firewall</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Affinity</Anchor>
  </SectionListItem>
  <SectionListItem>
    <Anchor>Snapshots</Anchor>
  </SectionListItem>
</SectionList>;
```
