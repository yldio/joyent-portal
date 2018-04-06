### Standard Tags

```jsx
// Name: Active
const React = require('react');
const { TagItem, TagList } = require('./');

<TagItem active>Tags:4lyf</TagItem>;

// Tab: Normal
const React = require('react');
const { TagItem, TagList } = require('./');

<TagItem>Tags:4lyf</TagItem>;

// Tab: Disabled
const React = require('react');
const { TagItem, TagList } = require('./');

<TagItem disabled>Tags:4lyf</TagItem>;

// Tab: Error
const React = require('react');
const { TagItem, TagList } = require('./');

<TagItem error>Tags:4lyf</TagItem>;
```

### Deleteable Tags

```jsx
// Name: Active
const React = require('react');
const { TagItem, TagList } = require('./');
const { PlusIcon } = require('../');
const { Margin } = require('styled-components-spacing');

<TagItem active>
  Tags:4lyf
  <Margin left="1">
    <PlusIcon />
  </Margin>
</TagItem>;

// Tab: Normal
const React = require('react');
const { TagItem, TagList } = require('./');
const { PlusIcon } = require('../');
const { Margin } = require('styled-components-spacing');

<TagItem>
  Tags:4lyf
  <Margin left="1">
    <PlusIcon />
  </Margin>
</TagItem>;

// Tab: Disabled
const React = require('react');
const { TagItem, TagList } = require('./');
const { PlusIcon } = require('../');
const { Margin } = require('styled-components-spacing');

<TagItem disabled>
  Tags:4lyf
  <Margin left="1">
    <PlusIcon />
  </Margin>
</TagItem>;

// Tab: Error
const React = require('react');
const { TagItem, TagList } = require('./');
const { PlusIcon } = require('../');
const { Margin } = require('styled-components-spacing');

<TagItem error>
  Tags:4lyf
  <Margin left="1">
    <PlusIcon />
  </Margin>
</TagItem>;
```
