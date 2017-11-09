Joyent's font is Libre Franklin, which is available to use at
[Google Fonts](https://fonts.google.com/specimen/Libre+Franklin).

The font sizes in the toolkit are based on an
[augmented fourth modular scale](http://www.modularscale.com/?15,24&px&1.414),
with base font size of **15px**.

### Headings

Headings are available from `h1` through to `h4`. If demand is shown for `h5`
and `h6`, these will be included in the toolkit.

To learn more about the correct usage of HTML headings, visit
[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements).

#### Heading 1

```jsx
const React = require('react');
const H1 = require('/').H1;

<H1>Inspire the lazy</H1>;
```

#### Heading 2

```jsx
const React = require('react');
const H2 = require('/').H2;

<H2>Inspire the lazy</H2>;
```

#### Heading 3

```jsx
const React = require('react');
const H3 = require('/').H3;

<H3>Inspire the lazy</H3>;
```

#### Heading 4

```jsx
const React = require('react');
const H4 = require('/').H4;

<H4>Inspire the lazy</H4>;
```

### Paragraph

```jsx
const React = require('react');
const P = require('/').P;

<P>
  Joyent experts provide 360 degree support for modern application
  architectures, including development frameworks, container orchestration
  tools, and hybrid cloud infrastructures.
</P>;
```

### Small

If you need to display content that is less important that the main body text,
or where space is more constrained, you can use the `<small>` element. This will
reduce the text size to 13px.

```jsx
const React = require('react');
const Small = require('/').Small;

<Small>
  Triton is 100% open source and designed to eliminate cloud provider lock-in.
  With support for popular container management tools like Kubernetes, augmented
  by our own open source project ContainerPilot, we are working with the
  community to deliver simple to operate platform services that are open and
  portable.
</Small>;
```

### Label

The `<label>` element is used for captions in the user interface and information
labels (i.e. text that is not continuous body text).

Read more about using the `<label>` element on the
[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).

```jsx
const React = require('react');
const Label = require('/').Label;

<Label>
  Hybrid, Modern and Open, Triton is engineered to run the world’s largest cloud
  native applications
</Label>;
```

### Anchors

Links in the toolkit are named `Anchor`. This is to avoid confusion with `Link`,
which is a
[React Router routing link](http://knowbody.github.io/react-router-docs/api/Link.html).

#### Primary

Primary anchor is a type of a link that sits outside the body text.

```
const React = require('react');
const Anchor = require('/').Anchor;

<Anchor href="https://joyent.com">Inspire the lazy</Anchor>
```

#### Reversed

Reversed anchors is used on dark backgrounds, where a default anchor would not
provide enough contrast.

```jsx
const React = require('react');
const Anchor = require('/').Anchor;

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
const Anchor = require('/').Anchor;

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
const Anchor = require('/').Anchor;

<Anchor disabled href="https://joyent.com">
  Inspire the lazy disabled
</Anchor>;
```
