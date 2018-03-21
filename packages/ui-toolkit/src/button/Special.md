#### Icon Button

Icon buttons are to be used to illustrate important actions and for when we are redirecting users to seperate services such as Github.

```jsx
// Name: Example
const React = require('react');
const { default: Button } = require('./');
const { StartIcon } = require('../');

<Button type="button" secondary bold icon>
  <StartIcon />
  <span>Start</span>
</Button>;
```

#### Delete Button

The delete button is basically an icon button, however it is coloured red to display the destructive nature of the action.

```jsx
// Name: Active
const React = require('react');
const { default: Button } = require('./');
const { DeleteIcon } = require('../');

<Button type="button" secondary bold icon error>
  <DeleteIcon fill="rgb(210, 67, 58)" />
  <span>Remove</span>
</Button>;

// Tab: Disabled
const React = require('react');
const { default: Button } = require('./');
const { DeleteIcon } = require('../');

<Button type="button" secondary disabled bold icon error>
  <DeleteIcon />
  <span>Remove</span>
</Button>;
```

#### Toggle Switch

Toggle switch is to be used when users have the choice to turn a service or feature on or off.

```jsx
// Name: Active
const React = require('react');
const { default: FormGroup } = require('../form/group');
const { default: Toggle } = require('../form/toggle');

<FormGroup name="who-killed-1">
  <Toggle value="video">Activate</Toggle>
</FormGroup>;

// Tab: Disabled
const React = require('react');
const { default: FormGroup } = require('../form/group');
const { default: Toggle } = require('../form/toggle');

<FormGroup name="who-killed-2" disabled>
  <Toggle value="video" disabled>
    Activate
  </Toggle>
</FormGroup>;
```
