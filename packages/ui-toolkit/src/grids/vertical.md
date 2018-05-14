### Spacing

In order to mainitain visual consistency and to make building as painless as possible, Triton employs a series of pre-defined spacing values and a variety of ways to implement those values.

### Spacing values

When defining the space necessary between and within components, alway use one of these pre-defined values. By using only 5 preset values, we can minimize inconsistency and ensure meaningful use of whitespace.

```jsx noeditor
const spacing = require('./spacing.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={spacing} />
```

### Stack - Vertical spacing

Stack, or the vertical spacing between elements, uses all of the values provided above and is the most common form of spacing used in Triton. Stack is used to seperate components from one another, but is not used for internal padding of cards.

```jsx noeditor
const stack = require('./stack.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={stack} />
```

<h4>Stack example</h4>

```jsx noeditor
const stackExample = require('./stack-example.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={stackExample} />
```

### Inline - Horizontal spacing

Inline, or the horizontal spacing between elements, is used to provide additional horizontal spacing when an element is not attached directly to the grid. Inline uses all the spacing values, except for the ‘Giant’ size, as when inline get’s to that size, designers should aim to attach components to the underlying grid instead of using spacing values.

```jsx noeditor
const inline = require('./inline.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={inline} />
```

<h4>Inline example</h4>

```jsx noeditor
const inlineExample = require('./inline-example.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={inlineExample} />
```

### Uniform Inset — Interior padding

Uniform Inset, or the equal padding on the interior of a component, takes the place of stack and inline when attempting to correctly space the contents of a card or component. Uniform inset adopts all but the ‘Giant’ spacing value to avoid an overwhelming amount of white-space in the card designs.

```jsx noeditor
const inset = require('./inset.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={inset} />
```

<h4>Uniform Inset example</h4>

```jsx noeditor
const insetExample = require('./inset-example.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={insetExample} />
```

### Squish Inset — Irregular interior padding

Squish inset, or irregular interior padding, adopts similar patterns of use to the ‘Uniform inset’ except has a different application of the spacing values. The ‘Squish inset’ has less padding on the top and bottom compared to left and right.

```jsx noeditor
const squishInset = require('./squish-inset.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={squishInset} />
```

<h4>Squish Inset example</h4>

```jsx noeditor
const squishInsetExample = require('./squish-inset-example.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={squishInsetExample} />
```
