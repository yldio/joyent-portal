### Baseline & Spacing

Most of the horizontal spacing between different elements and components is derived from 6 px. For example, the most common horizontal distance between elements of a component or components is 18 px. Another, less frequent, measurement is 12 px. The choice between 6, 12 or 18 px is based on visual and functional proximity of objects.

```jsx noeditor
const baseline = require('./baseline.svg');

<img style={{
    maxWidth: '100%',
    marginTop: 22,
    marginBottom: 40
}} src={baseline} />
```
