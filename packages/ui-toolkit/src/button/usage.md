```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button>Inspire the lazy</Button>
  <span> </span>
  <Button href="#1">Inspire the lazy (anchor)</Button>
</span>;
```

#### Button > Secondary

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button secondary>Inspire the brave</Button>
  <span> </span>
  <Button href="#2" secondary>
    Inspire the brave (anchor)
  </Button>
</span>;
```

#### Button > Tertiary

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button tertiary>Inspire the tertiary</Button>
  <span> </span>
  <Button href="#3" tertiary>
    Inspire the tertiary (anchor)
  </Button>
  <span> </span>
  <Button tertiary selected>
    Inspire the tertiary
  </Button>
</span>;
```

#### Button > Disabled

```jsx
const React = require('react');
const { default: Button } = require('./');

<span>
  <Button disabled>Inspire the liars</Button>
  <span> </span>
  <Button href="#4" disabled>
    Inspire the liars (anchor)
  </Button>
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
