```jsx
const React = require('react');
const remcalc = require('remcalc');
const { FormGroup, Checkbox } = require('../form');
const { default: Table, Thead, Tr, Th, Tbody, Td } = require('./');
const { Dot, Actions } = require('../icons');

<Table>
  <Thead>
    <Tr>
      <Th xs="32" padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup paddingTop={remcalc(4)}>
          <Checkbox />
        </FormGroup>
      </Th>
      <Th sortOrder="asc" showSort left middle actionable>
        <span>Name </span>
      </Th>
      <Th xs="150" left middle actionable>
        <span>Status </span>
      </Th>
      <Th xs="0" sm="160" left middle actionable>
        <span>Created </span>
      </Th>
      <Th xs="0" sm="130" left middle actionable>
        <span>Short ID </span>
      </Th>
      <Th xs="60" padding="0" />
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup paddingTop={remcalc(4)}>
          <Checkbox />
        </FormGroup>
      </Td>
      <Td middle left>
        <a href="/instances/hello">hello</a>
      </Td>
      <Td middle left>
        <span>
          <Dot
            width={remcalc(11)}
            height={remcalc(11)}
            borderRadius={remcalc(11)}
            color="primary"
          />{' '}
          Provisioning
        </span>
      </Td>
      <Td xs="0" sm="160" middle left>
        about 2 months
      </Td>
      <Td xs="0" sm="130" middle left>
        <code>2252839</code>
      </Td>
      <Td padding="0" center hasBorder="left">
        <Actions />
      </Td>
    </Tr>
    <Tr>
      <Td padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup paddingTop={remcalc(4)}>
          <Checkbox />
        </FormGroup>
      </Td>
      <Td middle left>
        <a href="/instances/world">world</a>
      </Td>
      <Td middle left>
        <span>
          <Dot
            width={remcalc(11)}
            height={remcalc(11)}
            borderRadius={remcalc(11)}
            color="green"
          />{' '}
          Running
        </span>
      </Td>
      <Td xs="0" sm="160" middle left>
        about 1 hour
      </Td>
      <Td xs="0" sm="130" middle left>
        <code>6739567</code>
      </Td>
      <Td padding="0" center hasBorder="left">
        <Actions />
      </Td>
    </Tr>
  </Tbody>
</Table>;
```
