#### Button > Primary
Primary button to be used once per page. Only use to indicate main action per pattern. 
Min. width: 120px

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button>Inspire the lazy</Button>
  <span> </span>
  <Button disabled>Inspire the lazy</Button>
</span>;
```

#### Button > Secondary
Secondary buttons can be used freely to indicate other actions on patterns.
Min. width: 120px

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button secondary>Inspire the brave</Button>
  <span> </span>
  <Button secondary disabled>Inspire the brave</Button>  
</span>;
```

#### Button > Small
Small buttons are supporters of the secondary button. They can be used within cluttered or complex patterns to free up space.

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button secondary small>Inspire the brave</Button>
</span>;
```

#### Button > Loading

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button secondary loading>
    Inspire the liars
  </Button>
</span>;
```

#### Button > Quick Action
Quick action buttons are to be imbedded in components to give additional functionality. They can be used in either primary or secondary colour palettes depending on importance

```jsx
const React = require('react');
const { default: Button } = require('./');
const { Actions } = require('../icons');
<span>
  <Button secondary icon rect>
    <Actions />
  </Button>
    <Button secondary icon rect disabled>
    <Actions />
  </Button>
</span>
```

#### Primary

Primary anchor is a type of a link that sits outside the body text.

```jsx
const React = require('react');
const Anchor = require('../text').Anchor;

<Anchor href="https://joyent.com">Inspire the lazy</Anchor>
```

#### Reversed

Reversed anchors is used on dark backgrounds, where a default anchor would not
provide enough contrast.

```jsx
const React = require('react');
const Anchor = require('../text').Anchor;

<span
  style={{
    'background-color': '#3B46CC',
    height: 80,
    width: 250,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center'
  }}
>
  <Anchor href="https://joyent.com" reversed>
    Inspire the lazy secondary
  </Anchor>
</span>;
```

#### In text anchor

In-paragraph anchor is a link that sits inside a text components. The default
state does not have an underline. The underline appears on hover and click.

```jsx
const React = require('react');
const Anchor = require('../text').Anchor;

<p>
  Body text. Crack that whip. Give the past a slip. Step on a crack. Break your
  momma's back. When a problem comes along.You must whip it.
  <Anchor href="#">Learn More</Anchor>
</p>;
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
