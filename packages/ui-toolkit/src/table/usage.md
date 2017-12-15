#### Header
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
        <FormGroup style={{display: 'flex', alignItems: 'center'}}>
          <Checkbox noMargin/>
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
      <Th xs="60" padding="0" />
    </Tr>
  </Thead>
    <Tbody/>
</Table>
  ```

  #### Footer
```jsx
const React = require('react');
const remcalc = require('remcalc');
const { FormGroup, Checkbox } = require('../form');
const { default: Table, Tfoot, Tr, Th, Td } = require('./');
const { Dot, Actions } = require('../icons');

<Table>
  <Tfoot>
    <Tr>
      <Th xs="32" padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup style={{display: 'flex', alignItems: 'center'}}>
          <Checkbox noMargin/>
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
      <Th xs="60" padding="0" />
    </Tr>
  </Tfoot>
</Table>
  ```

#### Multiple Selection List
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
        <FormGroup>
          <Checkbox noMargin/>
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
      <Th xs="60" padding="0" />
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup paddingTop={remcalc(4)}>
          <Checkbox noMargin checked/>
        </FormGroup>
      </Td>
      <Td middle left bold>
        percona-ram-32
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
      <Td padding="0" center hasBorder="left">
        <Actions />
      </Td>
    </Tr>
    <Tr>
      <Td padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup paddingTop={remcalc(4)}>
          <Checkbox noMargin/>
        </FormGroup>
      </Td>
      <Td middle left bold>
        percona-ram-32
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
      <Td padding="0" center hasBorder="left">
        <Actions />
      </Td>
    </Tr>
  </Tbody>
</Table>;
```

#### Single Selection List
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
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td padding="0" paddingLeft={remcalc(12)} middle left selected>
        <FormGroup paddingTop={remcalc(4)}>
          <Radio noMargin checked/>
        </FormGroup>
      </Td>
      <Td middle left bold selected>
        percona-ram-32
      </Td>
      <Td middle left selected>
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
      <Td xs="0" sm="160" middle left selected>
        about 2 months
      </Td>
    </Tr>
    <Tr>
      <Td padding="0" paddingLeft={remcalc(12)} middle left>
        <FormGroup paddingTop={remcalc(4)}>
          <Radio noMargin/>
        </FormGroup>
      </Td>
      <Td middle left bold>
        percona-ram-32
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
    </Tr>
  </Tbody>
</Table>;
```
