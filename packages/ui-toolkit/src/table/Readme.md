### Table Header

```jsx
// Name: Active
const React = require('react');
const { FormGroup, Checkbox } = require('../form');
const { default: Table, Thead, Tr, Th, Tbody } = require('./');

<Table>
  <Thead>
    <Tr>
      <Th xs="32" middle left>
        <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox noMargin />
        </FormGroup>
      </Th>
      <Th sortOrder="asc" showSort left middle selected actionable>
        <span>Name </span>
      </Th>
      <Th xs="150" left middle actionable>
        <span>Status </span>
      </Th>
      <Th xs="0" sm="160" left middle actionable>
        <span>Created </span>
      </Th>
      <Th xs="60" />
    </Tr>
  </Thead>
  <Tbody />
</Table>;
```

### Table Footer

```jsx
// Name: Active
const React = require('react');
const { FormGroup, Checkbox } = require('../form');
const { default: Table, Tfoot, Tr, Th } = require('./');

<Table>
  <Tfoot>
    <Tr>
      <Th
        style={{ borderTop: '1px solid rgb(216,216,216)' }}
        xs="32"
        middle
        left
      >
        <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox noMargin />
        </FormGroup>
      </Th>
      <Th
        style={{ borderTop: '1px solid rgb(216,216,216)' }}
        sortOrder="asc"
        showSort
        left
        middle
        selected
        actionable
      >
        <span>Name </span>
      </Th>
      <Th
        style={{ borderTop: '1px solid rgb(216,216,216)' }}
        xs="150"
        left
        middle
        actionable
      >
        <span>Status </span>
      </Th>
      <Th
        style={{ borderTop: '1px solid rgb(216,216,216)' }}
        xs="0"
        sm="160"
        left
        middle
        actionable
      >
        <span>Created </span>
      </Th>
      <Th style={{ borderTop: '1px solid rgb(216,216,216)' }} xs="60" />
    </Tr>
  </Tfoot>
</Table>;
```

### Empty Table

```jsx
// Name: Active
const React = require('react');
const { FormGroup, Checkbox } = require('../form');
const { default: Table, Thead, Tr, Th } = require('./');
const { Card, H3, Button, P } = require('../');
const { Padding, Margin } = require('styled-components-spacing');
const { default: Flex } = require('styled-flex-component');

<div>
  <Table>
    <Thead>
      <Tr>
        <Th
          style={{ borderTop: '1px solid rgb(216,216,216)' }}
          xs="32"
          middle
          left
        >
          <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox noMargin />
          </FormGroup>
        </Th>
        <Th
          style={{ borderTop: '1px solid rgb(216,216,216)' }}
          sortOrder="asc"
          showSort
          left
          middle
          selected
          actionable
        >
          <span>Name </span>
        </Th>
        <Th
          style={{ borderTop: '1px solid rgb(216,216,216)' }}
          xs="150"
          left
          middle
          actionable
        >
          <span>Status </span>
        </Th>
        <Th
          style={{ borderTop: '1px solid rgb(216,216,216)' }}
          xs="0"
          sm="160"
          left
          middle
          actionable
        >
          <span>Created </span>
        </Th>
        <Th style={{ borderTop: '1px solid rgb(216,216,216)' }} xs="60" />
      </Tr>
    </Thead>
  </Table>
  <Card>
    <Padding all="5">
      <Flex alignCenter justifyCenter column>
        <H3>No instances yet?</H3>
        <P center>
          You haven’t commissioned any instances yet, but they’re really easy to
          set up. Click below to get going.
        </P>
        <Margin top="2">
          <Button>Create Instance</Button>
        </Margin>
      </Flex>
    </Padding>
  </Card>
</div>;
```

### Multiple Selection List

```jsx
// Name: Active
const React = require('react');
const { FormGroup, Checkbox } = require('../form');
const { default: Table, Thead, Tr, Th, Tbody, Td } = require('./');
const { Dot, Actions } = require('../icons');

<Table>
  <Thead>
    <Tr>
      <Th xs="32" middle left>
        <FormGroup>
          <Checkbox noMargin />
        </FormGroup>
      </Th>
      <Th sortOrder="asc" showSort left middle selected actionable>
        <span>Name </span>
      </Th>
      <Th xs="150" left middle actionable>
        <span>Status </span>
      </Th>
      <Th xs="0" sm="160" left middle actionable>
        <span>Created </span>
      </Th>
      <Th xs="60" />
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td middle left>
        <FormGroup>
          <Checkbox noMargin checked />
        </FormGroup>
      </Td>
      <Td middle left bold>
        percona-ram-32
      </Td>
      <Td middle left>
        <span>
          <Dot size="11px" borderRadius={11} color="primary" /> Provisioning
        </span>
      </Td>
      <Td xs="0" sm="160" middle left>
        about 2 months
      </Td>
      <Td hasBorder="left" center>
        <Actions />
      </Td>
    </Tr>
    <Tr>
      <Td middle left>
        <FormGroup>
          <Checkbox noMargin />
        </FormGroup>
      </Td>
      <Td middle left bold>
        percona-ram-32
      </Td>
      <Td middle left>
        <span>
          <Dot size="11px" borderRadius={11} color="green" /> Running
        </span>
      </Td>
      <Td xs="0" sm="160" middle left>
        about 1 hour
      </Td>
      <Td hasBorder="left" center>
        <Actions />
      </Td>
    </Tr>
  </Tbody>
</Table>;
```

### Single Selection List

```jsx
// Name: Active
const React = require('react');
const { FormGroup, Radio } = require('../form');
const { default: Table, Thead, Tr, Th, Tbody, Td } = require('./');
const { Dot } = require('../icons');

<Table>
  <Thead>
    <Tr>
      <Th xs="32" middle left />
      <Th sortOrder="asc" showSort left middle selected actionable>
        <span>Name </span>
      </Th>
      <Th xs="150" left middle actionable>
        <span>Status </span>
      </Th>
      <Th xs="0" sm="160" left middle actionable>
        <span>Created </span>
      </Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td middle left selected>
        <FormGroup>
          <Radio noMargin checked />
        </FormGroup>
      </Td>
      <Td middle left bold selected>
        percona-ram-32
      </Td>
      <Td middle left selected>
        <span>
          <Dot size="11px" borderRadius={11} color="primary" /> Provisioning
        </span>
      </Td>
      <Td xs="0" sm="160" middle left selected>
        about 2 months
      </Td>
    </Tr>
    <Tr>
      <Td middle left>
        <FormGroup>
          <Radio noMargin />
        </FormGroup>
      </Td>
      <Td middle left bold>
        percona-ram-32
      </Td>
      <Td middle left>
        <span>
          <Dot size="11px" borderRadius={11} color="green" /> Running
        </span>
      </Td>
      <Td xs="0" sm="160" middle left>
        about 1 hour
      </Td>
    </Tr>
  </Tbody>
</Table>;
```
