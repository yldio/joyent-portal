#### Primary Button

Primary button to be used once per page. Only use to indicate main action per pattern.
Min. width: 120px

```jsx
// Name: Active
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button>Inspire the lazy</Button>
</span>;

// Tab: Disabled
const React = require('react');
const { default: Button } = require('./');
<span>
  <Button disabled>Inspire the brave</Button>
</span>;
```

#### Secondary Button

Secondary buttons can be used freely to indicate other actions on patterns.
Min. width: 120px

```jsx
// Name: Active
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button secondary>Inspire the brave</Button>
</span>;

// Tab: Disabled
const React = require('react');
const { default: Button } = require('./');
<span>
  <Button secondary disabled>
    Inspire the brave
  </Button>
</span>;
```

#### Loading Button

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button secondary loading>
    Inspire the liars
  </Button>
</span>;
```

#### Dropdown Button

```jsx
// Name: Example
const React = require('react');
const { default: ButtonGroup } = require('./group');
const { default: PopoverButton } = require('./popover');
const { Item } = require('../popover');
const { default: Button } = require('./');
const { StartIcon } = require('../');

<ButtonGroup>
  <Button secondary>
    <StartIcon />
    <span>Start</span>
  </Button>
  <PopoverButton secondary>
    <Item>Hello</Item>
    <Item>World</Item>
  </PopoverButton>
</ButtonGroup>;
```

#### Quick Action

Quick action buttons can be embedded in components to give additional functionality. They can be used in either primary or secondary color palettes, depending on importance.

```jsx
// Name: Active
const React = require('react');
const { default: Button } = require('./');
const { Actions } = require('../icons');
<span>
  <Button secondary icon actions>
    <Actions />
  </Button>
</span>;

// Tab: Disabled
const React = require('react');
const { default: Button } = require('./');
const { Actions } = require('../icons');
<span>
  <Button secondary icon actions disabled>
    <Actions />
  </Button>
</span>;
```

#### Primary

Primary anchor is a type of a link that sits outside the body text.

```jsx
const React = require('react');
const Anchor = require('../text').Anchor;

<Anchor href="https://joyent.com">Inspire the lazy</Anchor>;
```

#### Disabled

Disabled anchors cannot be actioned and the cursor is disabled.

```jsx
const React = require('react');
const Anchor = require('../text').Anchor;

<Anchor disabled href="https://joyent.com">
  Inspire the lazy disabled
</Anchor>;
```
