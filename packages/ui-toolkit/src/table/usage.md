```jsx
const React = require('react');
const { default: Table, Thead, Tr, Th, Tbody, Td } = require('./');
const { H4, P } = require('../text');

<Table>
  <Thead>
    <Tr>
      <Th xs="48" />
      <Th>Name</Th>
      <Th xs="150">Status</Th>
      <Th xs="150">Short ID</Th>
      <Th xs="48" />
    </Tr>
  </Thead>
  <Tbody>
    <Tr actionable>
      <Td border="right" middle center>HB</Td>
      <Td><H4>percona_high-ram-32_1</H4></Td>
      <Td>Provisioning</Td>
      <Td>2252839a</Td>
      <Td>HB</Td>
    </Tr>
    <Tr>
      <Td>HB</Td>
      <Td>percona_high-ram-32_2</Td>
      <Td>Provisioning</Td>
      <Td>2252839b</Td>
      <Td xs="48">HB</Td>
    </Tr>
    <Tr>
      <Td>HB</Td>
      <Td>percona_high-ram-32_3</Td>
      <Td>Provisioning</Td>
      <Td>2252839b</Td>
      <Td>HB</Td>
    </Tr>
  </Tbody>
</Table>
```
